import React from 'react';
import { FaLock } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { Popover, Transition } from '@headlessui/react';

function AddChannels() {
  return (
    <Popover>
      {({ open }) => (
        <>
          <button className="inline-flex items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1" >
            <span className="text-xs p-2">
              <FaLock />
            </span>
            <h2 className='text-xs w-full pl-2 text-left'>Channel #1</h2>
          </button>
          <Popover.Button className="inline-flex items-center w-full hover:bg-gray-800 hover:bg-opacity-30 rounded p-1">
            <span className="text-xs p-2">
              <MdAdd />
            </span>
            <h2 className="text-xs w-full pl-2 text-left">Add channels</h2>
          </Popover.Button>
          

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {/* [wip] pau 10/22 */}
            <Popover.Panel
              className={`${
                open ? '' : 'hidden'
              } absolute z-10 mt-2 w-40 origin-top-right bg-white rounded shadow-lg`}
            >
              <div className="py-1">
                <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-gray-900">
                  Create new channel
                </button>
                <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-200 hover:text-gray-900">
                  Browse Channels
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default AddChannels;
