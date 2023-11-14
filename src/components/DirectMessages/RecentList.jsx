import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { FormatName } from "../../services/utilities";

function RecentList({toggleRecents}) {
  const [caretIconDown, setCaretIconDown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [recentList, setRecentList] = useState([]); // [1,2,3,4,5
  const userList = JSON.parse(localStorage.getItem("userList"));
  

  useEffect(() => {
    const rL = JSON.parse(localStorage.getItem("recentList"));
  
    if (user && JSON.stringify(rL) !== JSON.stringify(recentList)) {
      setRecentList(prevRecentList => {
        // Use the previous state to ensure the most up-to-date value
        if (JSON.stringify(rL) !== JSON.stringify(prevRecentList)) {
          return rL;
        } else {
          return prevRecentList;
        }
      });
    }
  }, [recentList, user]);

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
          Recent Messages
        </h1>
      </div>

      {/* should render the div if caret is down & if channels is defined & if channels length > 0 ;
    if 'channels' is null, it will not eval channels.length */}
      {caretIconDown && recentList && recentList.length > 0 && (
        <div>
          {  
            recentList.map((recent, index) => {
              const userForRecent = userList.find((user) => user.id === recent);
              return (
                <div key={index} className="flex flex-row items-center justify-start gap-2 py-1 hover:bg-gray-800 hover:bg-opacity-30 rounded text-xs cursor-pointer">
                  
                  <Link className="inline-flex items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1" to={`/messages/${recent}`}>
                    <span className="text-xs p-2">
                      <BsFillPersonFill />
                    </span>
                    <h2 className="text-xs w-full pl-2 text-left">{FormatName(userForRecent.email)}</h2>
                  </Link>
                </div>
              )
            })
          }
        </div>
      )}
    </>
  )
}

export default RecentList;