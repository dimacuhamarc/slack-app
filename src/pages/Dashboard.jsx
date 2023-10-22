import { MainNav } from "../components/MainNav";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import Channels from "../components/Channels";
import AddChannels from "../components/AddChannels";

function Dashboard(props) {
  const [channelsVisible, setChannelsVisible] = useState(false);

  const toggleChannels = () => {
    setChannelsVisible(!channelsVisible);
  };

  return (
    <div>
      <MainNav />
      <div className="bg-indigo-800 bg-opacity-70 w-64 h-screen fixed left-16 z-[0] p-4 pl-8 rounded-e-xl text-gray-200">
        <div className="flex flex-row items-center border-b-2 border-indigo-50 px-2">
          <h1 className="font-bold text-xl">Avion School </h1>
          <span className="text-xs"><AiFillCaretDown/></span>
        </div>

        <div className="flex flex-col content-start justify-start items-start mt-5">
          <Channels toggleChannels={toggleChannels} />
          {channelsVisible && (<AddChannels />)}
        </div>


      </div>
    </div>
  );
}

export default Dashboard;
