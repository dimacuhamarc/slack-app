import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function RecentList({toggleRecents}) {
  const [caretIconDown, setCaretIconDown] = useState(false);
  const [channels, setChannels] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const recentList = JSON.parse(localStorage.getItem("recentList"));


  const toggleIcon = () => {
    setCaretIconDown(!caretIconDown);
    toggleRecents();
  };

  return (
    <>
      <div
        className="inline-flex items-center gap-2 text-xs cursor-pointer rounded w-full"
        onClick={toggleIcon}
      >
        <span className=" hover:bg-gray-800 hover:bg-opacity-30 rounded text-xs p-2">
          {caretIconDown ? <AiFillCaretDown /> : <AiFillCaretRight />}
        </span>
        <h1 className="hover:bg-gray-800 hover:bg-opacity-30 rounded pl-2 text-base font-bold w-full h-7">
          Channels
        </h1>
      </div>

      {/* should render the div if caret is down & if channels is defined & if channels length > 0 ;
    if 'channels' is null, it will not eval channels.length */}
      {caretIconDown && channels && channels.length > 0 && (
        <div>
          {channels.map((channel) => (
            <Link
              key={channel.id}
              to={`/channel/${channel.id}`}
              className="inline-flex items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1"
            >
              <span className="text-xs p-2">
                <BsFillPersonFill />
              </span>
              <h2 className="text-xs w-full pl-2 text-left">{channel.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}