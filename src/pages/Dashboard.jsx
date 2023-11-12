import { useState, useEffect } from 'react';
import UserService from '../services/UserServices';
import { Combobox } from '@headlessui/react';
import UserList from '../components/UserList';

function Dashboard(props) {
  document.title = "Avion School | Slack";  

  return (
    <div>
      <h1 className="text-white text-2xl font-bold">
        users: 
      </h1>
      
    </div>
  );
}

export default Dashboard;
