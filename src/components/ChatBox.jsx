import React, { useState, useEffect } from 'react';
import { BsFillPersonFill } from "react-icons/bs";

import axios from 'axios';
import { API_URL } from '../constants/Constants';
import { AiOutlineSend } from 'react-icons/ai';
import Loader from './Loader/Loader';
import { FormatName, FormatTimestamp } from '../services/utilities';

import './ChatBox.scss';

// no timestamp yet for msgs

const ChatBox = ({ receiverId, receiverClass }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser(); //fetches the info from localStorage
    retrieveMessages(); //fetches messages related to the recvrID/class
  }, [receiverId, receiverClass]);

  const fetchCurrentUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      // if user is truthy, current user will be set to 'user' val
      // if falsy, it will just return it to null or it's initial state
      setCurrentUser(user || null);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  // API request for retrieve message [wip]
  // issue: after logging out, getting a console error 'Error retrieving messages' [no fix yet]
  // created a getHeaders function here for the retrieve/send request
  const retrieveMessages = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await axios.get(`${API_URL}/messages`, {
        params: { receiver_id: receiverId, receiver_class: receiverClass },
        headers: getHeaders(),
      });

      const { data } = response;
      if (data) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error retrieving messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // send msg request
  const handleSendMessage = async () => {
    // trim: this wont allow user to send empty string
    if (newMessage.trim() !== '') {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await axios.post(
          `${API_URL}/messages`,
          {
            receiver_id: receiverId,
            receiver_class: receiverClass,
            body: newMessage,
          },
          {
            headers: getHeaders(),
          }
        );

        const { data } = response;
        if (data) {
          setMessages((prevMessages) => [...prevMessages, data.data]);
          setNewMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // allows user to send msg using enter key
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // reuseable header
  const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      'access-token': user.accessToken,
      client: user.client,
      expiry: user.expiry,
      uid: user.uid,
    };
  };

  // handle changes in the currentUser state
  useEffect(() => {
    // if user is null/not authenticaed, this will just set the msg to empty array
    // ensures msgs are cleared if user is null
    if (!currentUser) {
      setMessages([]);
    }
  }, [currentUser]); // retrig useEffect whenever the value of current user changes

  return (
    <div className="flex flex-col justify-between items-start w-full px-4 py-4 gap-3 bg-indigo-950 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="block w-full overflow-y-auto scroll-smooth snap-y">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex flex-row items-center justify-center gap-4 text-white bg-indigo-900 snap-start px-4 py-3 rounded-md mb-3"
              >
                <BsFillPersonFill className={message.sender && message.sender.id === currentUser?.id ? 'text-indigo-500 w-8 h-8 p-1 rounded-lg bg-white' : 'text-black w-8 h-8 p-1 rounded-lg bg-white'} />
                <div className='flex flex-col items-start justify-start w-full'>
                <span className='inline-flex flex-row justify-between items-start mb-0.5 w-full'>
                  <span className="inline font-extrabold text-base  text-indigo-100 transition-all ease-in-out hover:text-white hover:underline w-full">
                    {/* 
                      if sender ID is matched with the current user ID, it should display "Me"
                      if the sender has an email, it will display the email add 
                      if sender info is missing, should display "unknown user"
                    */}
                    {message.sender && message.sender.id === currentUser?.id
                      ? 'Me'
                      : message.sender && message.sender.email
                      ? FormatName(message.sender.email)
                      : 'Unknown User'}
                  </span>
                  <span className='inline self-center text-right text-xs w-full'>
                    {FormatTimestamp(message.created_at)}
                  </span>
                </span>

                <span className="block w-full text-sm text-white"> {message.body}</span>
              </div>
              </div>
            ))}
            <span className='overflow-anchor'></span>
          </div>
        </>
      )}
      <div className="flex items-center border w-full rounded-md border-gray-800 ">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex p-3 border border-gray-300 rounded-l-md w-11/12"
          onKeyPress={handleEnter}
        />
        <button
          onClick={handleSendMessage}
          className="p-3 bg-indigo-600 border text-white rounded-r-md hover:bg-indigo-700 w-1/12 h-full"
        >
          <span className="text-xl">
            <AiOutlineSend />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
