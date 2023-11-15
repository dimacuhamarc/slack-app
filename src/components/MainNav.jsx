import {
  AiFillHome,
  AiOutlineEllipsis
} from 'react-icons/ai';
import { IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { useState } from 'react';

import UserDetails from './UserDetails';

const MainLinks = [
  {
    name: 'Home',
    icon: <AiFillHome/>,
    to: '/'
  }
]

export const MainNav = () => {
  const [showChannelDetails, setChannelDetails] = useState(false);

  const openChannelDetails = () => {
    setChannelDetails(true);
  }

  const closeChannelDetails = () => {
    setChannelDetails(false);
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <>
      <div className="flex flex-col items-center justify-between bg-indigo-500 fixed h-screen w-20 pt-6 rounded-e-xl z-[1]">
        <div className="flex flex-col gap-3 justify-center p-2">
          <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" alt="Slack Logo" className="ring-[2px] ring-offset-[4px] ring-offset-indigo-500 ring-indigo-200 bg-gray-200 bg-opacity-30 p-2 mb-4 rounded-xl h-10 w-10 hover:scale-105 hover:brightness-110" />
          {
            MainLinks.map((link, index) => (
              <Link key={index} to={link.to}>
                <div className='hover:bg-gray-200 hover:bg-opacity-30 text-white p-2 rounded-xl h-10 w-10 hover:scale-105 hover:brightness-110 text-[1.5rem]'>
                  {link.icon} 
                </div>
                <p className="text-xs text-center text-white">{link.name}</p>
              </Link>
            ))
          }
          <button onClick={openChannelDetails}>
            <div className='hover:bg-gray-200 hover:bg-opacity-30 text-white p-2 rounded-xl h-10 w-10 hover:scale-105 hover:brightness-110 text-[1.5rem]'>
              <AiOutlineEllipsis/> 
            </div>
            <p className="text-xs text-center text-white">More</p>
          </button>
        </div>
        <div className='mb-4'>
          <Link onClick={handleLogout}>
            <div className='hover:bg-gray-200 hover:bg-opacity-30 text-white p-1 rounded-xl h-10 w-10 hover:scale-105 hover:brightness-110 text-[2rem]'>
              <IoLogOut/> 
            </div>
          </Link>
        </div>
      </div>
      <UserDetails
        isOpen={showChannelDetails}
        onClose={closeChannelDetails}
        />
    </>
  );
}