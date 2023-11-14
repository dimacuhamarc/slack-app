import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function ChannelModal({ isOpen, onClose, onCreateChannel }) {
  const [channelName, setChannelName] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState("");
  const [disableCreate, setDisableCreate] = useState(true);

  useEffect(() => {
    setDisableCreate(channelName.trim() === "");
  }, [channelName]);

  const handleCreateChannel = () => {
    onCreateChannel(channelName, channelMembers);
    onClose();
  };

  const handleAddMember = () => {
    const membersToAdd = currentMember
      .split(",")
      .map((member) => member.trim())
      .filter((member) => /^\d+$/.test(member))
      .filter((member) => parseInt(member, 10) >= 4000);

    setChannelMembers([...channelMembers, ...membersToAdd]);
    setCurrentMember("");
  };

  const handleRemoveMember = (index) => {
    const newMembers = [...channelMembers];
    newMembers.splice(index, 1);
    setChannelMembers(newMembers);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Create a New Channel
              </Dialog.Title>
              <div className="mt-4">
                <label
                  htmlFor="channelName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Channel Name
                </label>
                <input
                  required
                  type="text"
                  id="channelName"
                  name="channelName"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />

                <label
                  htmlFor="channelMembers"
                  className="mt-3 block text-sm font-medium text-gray-700"
                >
                  Channel Members
                </label>
                <div className="flex flex-wrap items-center">
                  {Array.isArray(channelMembers) &&
                    channelMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 rounded-md px-3 py-1 m-1"
                      >
                        <span className="mr-2">{member}</span>
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleRemoveMember(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  <input
                    required
                    type="text"
                    id="channelMembers"
                    name="channelMembers"
                    value={currentMember}
                    onChange={(e) => setCurrentMember(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === ",") {
                        e.preventDefault();
                        handleAddMember();
                      }
                    }}
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  />
                </div>

                <p className="text-xs text-blue-700">
                  * Enter Channel Members separated by comma.
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleCreateChannel}
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                    disableCreate
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
                >
                  Create Channel
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ChannelModal;
