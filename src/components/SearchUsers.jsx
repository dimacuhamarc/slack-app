import { useState, useEffect } from "react";
import { Combobox } from '@headlessui/react'
import UserList from "./UserList";

function SearchUsers ({userList}) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [search, setSearch] = useState('');

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input className="text-black w-full rounded-full" onChange={(event) => setSearch(event.target.value)} />
      <Combobox.Options className="relative overflow-scroll h-40 bg-white mt-1 rounded-lg w-full">
        {/* <UserList /> */}
      </Combobox.Options>
    </Combobox>
  );
}

export default SearchUsers;
