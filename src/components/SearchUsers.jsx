import { useState, useEffect } from "react";
import { Combobox } from '@headlessui/react'

function SearchUsers ({userList}) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [search, setSearch] = useState('');

  

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input className="text-black w-full rounded-full" onChange={(event) => setSearch(event.target.value)} />
      <Combobox.Options className="relative bg-white mt-1 rounded-lg w-full">
        <Combobox.Option defaultValue={'--'}>
          {search}
        </Combobox.Option>
      </Combobox.Options>
    </Combobox>
  );
}

export default SearchUsers;
