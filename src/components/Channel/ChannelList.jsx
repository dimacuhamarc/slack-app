import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { FaLock } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function ChannelList ( { toggleChannels } ) {
    const [caretIconDown, setCaretIconDown] = useState(false);
    const [channels, setChannels] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      if(user){
        getChannels();
      }
    }, [user]);

    async function getChannels(){
      try {
          const response = await axios.get(`${API_URL}/channels`, {
              headers: {
                  "access-token": user.accessToken,
                  client: user.client,
                  expiry: user.expiry,
                  uid: user.uid
              }
          });
          const { data } = response;
          if(data){
              setChannels(data.data);
          }
      } catch (error) {
          if(error.response.data.errors){
              return alert("Invalid credentials");
          }
      }
  }

    const toggleIcon = () => {
        setCaretIconDown(!caretIconDown)
        toggleChannels();
    }

  return (
    <>
      <div
        className="inline-flex items-center gap-2 text-xs cursor-pointer rounded w-full"
        onClick={toggleIcon}>
        <span className=" hover:bg-gray-800 hover:bg-opacity-30 rounded text-xs p-2">
          {caretIconDown ? 
            <AiFillCaretDown /> : <AiFillCaretRight />
          }
        </span>
        <h1 className="hover:bg-gray-800 hover:bg-opacity-30 rounded pl-2 text-base font-bold w-full h-7">Channels</h1>
      </div>

      {/* {!caretIconDown && (    
      <div>
        {channels.map((channel) => (
          <button key={channel.id} className="inline-flex items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1">
            <span className="text-xs p-2">
              <FaLock />
            </span>
            <h2 className='text-xs w-full pl-2 text-left'>
              {channel.name}
            </h2>
          </button>
        ))}
      </div>
      )} */}

    {caretIconDown && channels && channels.length > 0 && (
        <div>
          {channels.map((channel) => (
            <Link key={channel.id} to={`/channel/${channel.id}`} className="inline-flex items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1">
              <span className="text-xs p-2">
                <FaLock />
              </span>
              <h2 className='text-xs w-full pl-2 text-left'>
                {channel.name}
              </h2>
            </Link>
          ))}
        </div>
      )}

    </>
  );
};

export default ChannelList;

