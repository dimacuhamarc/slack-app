import React from "react";
import { useState } from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function Channels( { toggleChannels} ) {
    const [caretIconDown, setCaretIconDown] = useState(true);

    const toggleIcon = () => {
        setCaretIconDown(!caretIconDown)
        toggleChannels();
    }

  return (
    <div>

      <div className="flex w-full">
        <span
            className="text-xs hover:bg-gray-200 hover:bg-opacity-30 cursor-pointer p-2 rounded"
            onClick={toggleIcon}>
                {caretIconDown ? <AiFillCaretRight /> : <AiFillCaretDown />}
        </span>

        <h2 className="hover:bg-gray-200 hover:bg-opacity-30 py-0.5 px-1.5 rounded cursor-pointer">
          Channels
        </h2>
      </div>

    </div>
  );
};

export default Channels;