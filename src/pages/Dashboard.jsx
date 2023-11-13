import { useState, useEffect } from 'react';
import UserService from '../services/UserServices';
import { Combobox } from '@headlessui/react';
import { FormatName } from '../services/utilities';

function Dashboard(props) {
  document.title = 'Avion School | Slack';
  const [userList, setUserList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1 className="text-white text-4xl font-normal">Welcome, <span className='font-bold text-indigo-300 underline underline-offset-4'>{FormatName(user.email)}</span>!</h1>
      
    </div>
  );
}

export default Dashboard;
