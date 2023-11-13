import { Combobox } from '@headlessui/react'
import { useEffect, useState } from "react";
import { FormatName } from '../services/utilities';
import UserService from '../services/UserServices';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';


function SearchUsers () {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

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

  const filteredList = search === '' ? userList : userList.filter((user) => {
    return user.email.toLowerCase().includes(search.toLowerCase())
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if(selected) {
      console.log(selected);
      navigate(`/messages/${selected}`);
      setSelected(null);
      setSearch('');
    } else {
      console.log("No user selected");
    }
  }
  
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className='inline-flex items-center justify-center gap-2 w-full'>
        <Combobox.Input className="text-black w-full rounded-lg pl-2" placeholder="Search Users" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Combobox.Button className="text-xs text-white w-6 py-1 rounded-lg hover:ring-2 " onClick={handleSearchSubmit}><PiMagnifyingGlass/></Combobox.Button>
      </div>
      <Combobox.Options className="relative overflow-scroll max-h-40 bg-white mt-1 rounded-lg w-full">
        {
          filteredList && filteredList.map((indiv) => {
            const { id, email } = indiv;
            return (
              <Combobox.Option  className="text-black hover:bg-gray-300 hover:outline hover:outline-indigo-400 cursor-pointer" key={id} value={id}>
                <p className="text-black pl-2">{FormatName(email)}</p>
              </Combobox.Option>
            );
          })
        }
        {filteredList.length === 0 && <span className="text-black pl-2">No users available</span>}
      </Combobox.Options>
    </Combobox>
  );
}

export default SearchUsers;
