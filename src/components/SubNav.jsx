import { useState } from "react";
import { API_URL } from "../constants/Constants";
import ChannelList from "./Channel/ChannelList";
import AddChannels from "./Channel/AddChannels";
import ChannelModal from "./Channel/ChannelModal";
import axios from "axios";

export const SubNav = () => {
  const [channelsVisible, setChannelsVisible] = useState(false);
  const [channelModVisible, setChannelModVisible] = useState(false);
  const [dmVisible, setDmVisible] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: "", userId: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  const openModal = () => {
    setChannelModVisible(true);
  };

  const closeModal = () => {
    setChannelModVisible(false);
  };

  async function createChannel(channelName, channelMembers) {
    // this will check if data from modal inpur [channelMembers] is an array
    // if yes, then it will proceed to map/filter
    const members = Array.isArray(channelMembers)
      ? channelMembers
          .map((member) => parseInt(member.trim())) //map each member, trim & convert to integer
          .filter((member) => !isNaN(member)) // filter out non-integer inputs
      : []; // if non-array ung input, will default into an empty array

    const channelData = {
      name: channelName,
      user_ids: members,
    };

    try {
      const response = await axios.post(`${API_URL}/channels`, channelData, {
        headers: {
          "access-token": user.accessToken,
          client: user.client,
          expiry: user.expiry,
          uid: user.uid,
        },
      });
      const { data } = response;
      if (data) {
        setNewChannel(data);
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      alert("Failed to create channel.");
    }
  }

  const toggleDMs = () => {
    setDmVisible(!dmVisible);
  };

  const toggleChannels = () => {
    setChannelsVisible(!channelsVisible);
  };
  
  return (
    <div className="bg-indigo-800 bg-opacity-70 w-64 h-screen fixed left-16 z-[0] rounded-e-xl text-gray-200">
      <div className="flex flex-row items-center justify-start px-2 py-4 pt-4 border-b-[1px] border-b-opacity-20 border-b-indigo-200">
        <h1 className="font-semibold text-xl ml-10">Avion School</h1>
      </div>
      <div className="mt-4 ml-8 mr-3">
        <ChannelList toggleChannels={toggleChannels} />
        {channelsVisible && <AddChannels openModal={openModal} />}{" "}
        {/* openModal function as prop */}
      </div>
      <ChannelModal
        isOpen={channelModVisible}
        onClose={closeModal}
        onCreateChannel={createChannel}
      />
    </div>
  );
};
