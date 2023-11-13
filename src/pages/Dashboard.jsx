import { useState, useEffect } from 'react';
import UserService from '../services/UserServices';
import { Combobox } from '@headlessui/react';

function Dashboard(props) {
  document.title = 'Avion School | Slack';
  const [userList, setUserList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Apply getUsers function from UserService here
    const storedUserList = JSON.parse(localStorage.getItem('userList'));

    if(user) {
      if (storedUserList) {
        setUserList(storedUserList);
        console.log("User List Exists");
        return;
      }
  
      async function fetchUsers() {
        const users = await UserService.getUsers(user);
        setUserList(users);
        localStorage.setItem('userList', JSON.stringify(users));
      }
      fetchUsers();
      console.log("User List Fetched");
    }
  },[]);

  return (
    <div>
      <h1 className="text-white text-2xl font-bold">users:</h1>
      {userList &&
        userList.map((individual) => {
          const { id, email } = individual;
          return (
            <div className='text-white' key={id}>
              <p>ID: {id}</p>
              <p>Email: {email}</p>
            </div>
          );
        })}
      {!userList && <div>No users available</div>}
    </div>
  );
}

export default Dashboard;
