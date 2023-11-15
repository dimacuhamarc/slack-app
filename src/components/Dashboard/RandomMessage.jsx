import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { FormatName } from "../../services/utilities";

function RandomMessage() {
  const userList = JSON.parse(localStorage.getItem("userList"));
  const [selectedUser, setSelectedUser] = useState(
    () => userList ? userList[Math.floor(Math.random() * userList.length)] : null
  );

  const navigate = useNavigate();

  const selectRandomUser = () => {
    // Select a random user from the user list
    const randomIndex = Math.floor(Math.random() * userList.length);
    const randomUser = userList[randomIndex];
    setSelectedUser(randomUser);
  };

  //select every 30 seconds
  

  useEffect(() => {
    if(userList) {
      const interval = setInterval(() => {
        selectRandomUser();
      }, 20000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleUserClick = (event, user) => {
    event.preventDefault();
    navigate(`/messages/${user}`);
      if (localStorage.getItem('recentList') === null) {
        const recentList = [];
        recentList.push(user);
        localStorage.setItem('recentList', JSON.stringify(recentList));
      }
      if (JSON.parse(localStorage.getItem('recentList')).includes(user)) {
        console.log('User already exists in recent list');
      } else {
        const existingList = JSON.parse(localStorage.getItem('recentList'));

        existingList.push(user);

        localStorage.setItem('recentList', JSON.stringify(existingList));
      }
  };


  return (
    <div className="bg-indigo-700 rounded-lg mt-4 p-2 py-4">
      <div
        className="inline-flex items-center gap-2 text-white text-xs rounded w-full "
      >
        <h1 className="rounded pl-2 text-2xl font-bold w-full h-7 mb-2 underline-offset-4 hover:underline">
          You have no recent messages. Start a conversation!
        </h1>
      </div>
      {selectedUser && (
        <Link
          onClick={(e) => {
            handleUserClick(e, selectedUser.id);
          }}
          className="inline-flex text-white items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1 cursor-pointer hover:ring-2 hover:ring-indigo-400"
        >
          <span className=" text-white text-xs p-2">
            <BsFillPersonFill />
          </span>
          <div className="w-full pl-2">
            <h2 className="text-left">
              {FormatName(selectedUser.email)}
            </h2>
            <h2 className="text-xs">
            {selectedUser.email}
            </h2>
          </div>
        </Link>
      )}
    </div>
  );
}

export default RandomMessage;
