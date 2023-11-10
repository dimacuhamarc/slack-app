import { useState, useEffect } from "react";
import { API_URL } from "../constants/Constants";
import ChannelList from "./Channel/ChannelList";
import AddChannels from "./Channel/AddChannels";
import ChannelModal from "./Channel/ChannelModal";
import axios from "axios";

export const SubNav = (user) => {
  const [channelsVisible, setChannelsVisible] = useState(false);
  const [channelModVisible, setChannelModVisible] = useState(false);
  const [dmVisible, setDmVisible] = useState(false);

  // useEffect(() => {
  //   if(user){
  //     createChannel();
  //   }
  // }, []);

  const openModal = () => {
    setChannelModVisible(true);
  };

  const closeModal = () => {
    setChannelModVisible(false);
  };

  async function createChannel(channelName, channelMembers){
    const channelData = {
      name: channelName,
      user_ids: channelMembers.split(',').map(member => parseInt(member.trim())),
    };
    
    try{
      const response = await axios.post(`${API_URL}/channels`, channelData, {
        headers: {
            "access-token": user.accessToken,
            client: user.client,
            expiry: user.expiry,
            uid: user.uid
        }
    });
    const { data } = response;
    if(data) {
      return alert("Successfully Created Channel")
    }
    } catch (error) {
      console.error("Error creating channel:", error);
      console.error("User Object:,", user)
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
        {channelsVisible && <AddChannels openModal={openModal} />} {/* openModal function as prop */}
      </div>
      <ChannelModal
        isOpen={channelModVisible}
        onClose={closeModal}
        onCreateChannel={createChannel}
      />
    </div>
  );
};

