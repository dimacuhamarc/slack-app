import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../constants/Constants';
import { FaLock } from 'react-icons/fa';

function MyChannels() {
  const [channels, setChannels] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      getChannels();
    }
  }, [user]);

  async function getChannels() {
    try {
      const response = await axios.get(`${API_URL}/channels`, {
        headers: {
          'access-token': user.accessToken,
          client: user.client,
          expiry: user.expiry,
          uid: user.uid,
        },
      });
      const { data } = response;
      if (data) {
        setChannels(data.data);
      }
    } catch (error) {
      if (error.response.data.errors) {
        return alert('Invalid credentials');
      }
    }
  }

  return (
    <>
      {channels && channels.length > 0 && (
        <div className="bg-indigo-700 rounded-lg mt-4 p-2 py-4">
          <div className="inline-flex items-center gap-2 text-white text-xs rounded w-full">
            <h1 className="rounded pl-2 text-2xl font-bold w-full h-7 mb-2 underline-offset-4 hover:underline">
              Your Channels
            </h1>
          </div>
  
          <div>
            {channels.map((channel) => (
              <Link
                key={channel.id}
                to={`/channel/${channel.id}`}
                className="inline-flex text-white items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1 cursor-pointer hover:ring-2 hover:ring-indigo-400"
              >
                <span className=" text-white text-xs p-2">
                  <FaLock />
                </span>
                <h2 className="text-xs w-full pl-2 text-left">
                  {channel.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );  
}

export default MyChannels;
