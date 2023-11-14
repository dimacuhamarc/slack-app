import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FormatName } from "../../services/utilities";

function MyMessages() {
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

  return (
    <div className="bg-indigo-700 rounded-lg mt-4 p-2 py-4">
      <div
        className="inline-flex items-center gap-2 text-white text-xs rounded w-full "
      >
        <h1 className="rounded pl-2 text-2xl font-bold w-full h-7 mb-2 underline-offset-4 hover:underline">
          Your Messages
        </h1>
      </div>
        <div>
          {recentList.map((recent, index) => {
            const userForRecent = userList.find((user) => user.id === recent);
            return (
              <Link
                key={index}
                to={`/messages/${recent}`}
                className="inline-flex text-white items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1 cursor-pointer hover:ring-2 hover:ring-indigo-400"
              >
                <span className=" text-white text-xs p-2">
                  <BsFillPersonFill />
                </span>
                <h2 className="text-xs w-full pl-2 text-left">{FormatName(userForRecent.email)}</h2>
              </Link>
            );
          })}
        </div>
    </div>
  );
}

export default MyMessages;
