import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { FaLock } from 'react-icons/fa';
import { Link } from "react-router-dom";
import React, { useState } from "react";

function RecentInbox () {
  const [caretIconDown, setCaretIconDown] = useState(false);
  const [channels, setChannels] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleIcon = () => {
    setCaretIconDown(!caretIconDown)
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
        <h1 className="hover:bg-gray-800 hover:bg-opacity-30 rounded pl-2 text-base font-bold w-full h-7">Recent Messages</h1>
      </div>

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

export default RecentInbox;