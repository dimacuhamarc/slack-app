import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiCaretDownBold } from "react-icons/pi";
import { BsPersonFillAdd } from "react-icons/bs";
import { API_URL } from "../constants/Constants";
import ChatBox from "../components/ChatBox";
import AddMember from "../components/Channel/AddMembers";
import ChannelDetails from "../components/Channel/ChannelDetails";
import ChannelService from "../services/ChannelServices";
import axios from "axios";

function Channels() {
  document.title = "Channels | Slack";
  const { id } = useParams();
  const [addModVisible, setAddModVisible] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [channelName, setChannelName] = useState("")
  const [showChannelDetails, setChannelDetails] = useState(false);

  useEffect(() => {
    // console.log("Channel Id:", id)
    async function fetchChannelInfo() {
      try {
        const channelInfo = await ChannelService.getChannelInfo(id);
        if (channelInfo && channelInfo.data) {
          setChannelName(channelInfo.data.name);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching channel info:", error);
      }
    }
    fetchChannelInfo();
  }, [id]);

  async function addChannelMember(memberToAdd) {
    const channelId = parseInt(id, 10);
    const newUserId = parseInt(memberToAdd, 10);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `${API_URL}/channel/add_member`,
        {
          id: channelId,
          member_id: newUserId,
        },
        {
          headers: {
            "access-token": user.accessToken,
            client: user.client,
            expiry: user.expiry,
            uid: user.uid,
          },
        }
      );

      const { data } = response;
      console.log(data);
      if (data) {
        setNewMember(data.channel_members);
      }
    } catch (error) {
      alert("Failed to add the member to the channel");
    }
  }

  const openChannelDetails = () => {
    setChannelDetails(true);
  }

  const closeChannelDetails = () => {
    setChannelDetails(false);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-start h-12">
        <h1
          className="flex flex-row text-white text-2xl font-bold hover:underline hover:cursor-pointer underline-offset-8"
          title="Show Channel Details"
          onClick={openChannelDetails}
        >
          Channel Name: {channelName} <PiCaretDownBold className="ml-2 px-1 mt-1" />
        </h1>
        <button
          className="inline-flex items-center gap-2 justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md  group"
          onClick={() => setAddModVisible(true)}
        >
          <span className="hidden transition-all ease-in-out text-sm group-hover:inline-block">
            Add Members
          </span>
          <BsPersonFillAdd className="inline-block" />
        </button>

        <AddMember
          isOpen={addModVisible}
          onClose={() => setAddModVisible(false)}
          onAddMembers={addChannelMember}
        />
      </div>

      <div className="flex w-full h-full">
        <ChatBox receiverId={id} receiverClass="Channel" />
      </div>

      <ChannelDetails
        isOpen={showChannelDetails}
        onClose={closeChannelDetails}
        channelId={id}
        />
    </>
  );
}

export default Channels;
