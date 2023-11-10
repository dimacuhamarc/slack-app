import React from "react";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function ChannelList ( { toggleChannels} ) {
    const [caretIconDown, setCaretIconDown] = useState(true);

    const toggleIcon = () => {
        setCaretIconDown(!caretIconDown)
        toggleChannels();
    }

  return (
    <div
      className="inline-flex items-center gap-2 text-xs cursor-pointer rounded w-full"
      onClick={toggleIcon}>
      <span className=" hover:bg-gray-800 hover:bg-opacity-30 rounded text-xs p-2">
        {caretIconDown ? 
          <AiFillCaretRight /> : <AiFillCaretDown />
        }
      </span>
      <h1 className="hover:bg-gray-800 hover:bg-opacity-30 rounded pl-2 text-base font-bold w-full h-7">Channels</h1>
    </div>
  );
};

export default ChannelList;

