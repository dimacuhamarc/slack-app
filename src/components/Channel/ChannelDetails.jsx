import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ChannelService from "../../services/ChannelServices";
import { useParams } from "react-router-dom";

function ChannelDetails({ isOpen, onClose }) {
  const [channelInfo, setChannelInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchChannelDetails() {
      try {
        const data = await ChannelService.getChannelInfo(id);
        setChannelInfo(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching channel info:", error);
      }
    }

    if (isOpen) {
      fetchChannelDetails();
    }
  }, [isOpen, id]);

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
                Channel Details
              </Dialog.Title>
              <div className="mt-4 text-gray-900">
                {channelInfo ? (
                  <>
                    <p>Channel Name: {channelInfo.data.name}</p>
                    <p>Channel Owner: {channelInfo.data.owner_id}</p>
                    <p>Channel Members:</p>
                    <ul>
                      {channelInfo.data.channel_members &&
                        channelInfo.data.channel_members.map((member) => (
                          <li key={member.user_id}>{member.user_id} : Added {member.created_at}</li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <p>Loading channel details...</p>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ChannelDetails;
