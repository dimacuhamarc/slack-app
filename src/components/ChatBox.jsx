import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { AiOutlineSend } from "react-icons/ai";
import Loader from "./Loader/Loader";

// no timestamp yet for msgs

const ChatBox = ({ receiverId, receiverClass }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser(); //fetches the info from localStorage
    retrieveMessages(); //fetches messages related to the recvrID/class
  }, [receiverId, receiverClass]);

  const fetchCurrentUser = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // if user is truthy, current user will be set to 'user' val
      // if falsy, it will just return it to null or it's initial state
      setCurrentUser(user || null);
    } catch (error) {
      console.error("Error fetching current user:", error);
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
      console.error("Error retrieving messages:", error);
    } finally {
      setLoading(false);
    }
  };

    // send msg request
  const handleSendMessage = async () => {
    // trim: this wont allow user to send empty string
    if (newMessage.trim() !== "") {
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
          setNewMessage("");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // allows user to send msg using enter key
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

    // reuseable header
  const getHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      "access-token": user.accessToken,
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
    <div className="flex flex-col justify-start items-start w-full px-4 py-4 gap-3 bg-indigo-950 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col w-full overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className="text-white w-full bg-indigo-900 px-4 py-3 rounded-md mb-3"
              >
                <span className="font-semibold text-white">
                  {/* 
                    if sender ID is matched with the current user ID, it should display "Me"
                    if the sender has an email, it will display the email add 
                    if sender info is missing, should display "unknown user"
                  */}
                  {message.sender && message.sender.id === currentUser?.id
                    ? "Me"
                    : message.sender && message.sender.email
                    ? message.sender.email
                    : "Unknown User"}
                  :
                </span>
                <span className="text-white"> {message.body}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center border w-full rounded-md border-gray-800 pt-5 bg-gray-800">
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
        </>
      )}
    </div>
  );
};

export default ChatBox;
