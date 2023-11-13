import { useState, useEffect } from 'react';
import UserService from '../services/UserServices';
import { Combobox } from '@headlessui/react';
import { FormatName } from '../services/utilities';

const UserList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [userList, setUserList] = useState([]);

  // useEffect(() => {
  //   // Apply getUsers function from UserService here
  //   async function fetchUsers() {
  //     try {
  //       const users = await UserService.getUsers(user);
  //       setUserList(users);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   }

  //   fetchUsers();
  // }, [user]);

  return (
    <>
      {userList &&
        userList.map((individual) => {
          const { id, email } = individual;
          return (
            <Combobox.Option className="text-black hover:bg-gray-300" key={id}>
              <p className="text-black">{FormatName(email)}</p>
            </Combobox.Option>
          );
        })}
      {!userList && <div className="text-black">No users available</div>}
    </>
  );
};

export default UserList;
