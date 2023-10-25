import { useState } from "react";
import Channels from "../components/Channels";
import AddChannels from "../components/AddChannels";

export const SubNav = () => {
  const [channelsVisible, setChannelsVisible] = useState(false);

  const toggleChannels = () => {
    setChannelsVisible(!channelsVisible);
  };
  return (
    <div className="bg-indigo-800 bg-opacity-70 w-64 h-screen fixed left-16 z-[0] rounded-e-xl text-gray-200">
        <div className="flex flex-row items-center justify-start px-2 py-4 pt-4 border-b-[1px] border-b-opacity-20 border-b-indigo-200">
          <h1 className="font-semibold text-xl ml-10">Avion School</h1>
        </div>
        <div className="mt-4 ml-8 mr-3">
          <Channels toggleChannels={toggleChannels} />
          {channelsVisible && (<AddChannels />)}
        </div>
      </div>
  );
};
