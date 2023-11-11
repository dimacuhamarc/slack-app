import React from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import { PiCaretDownBold } from "react-icons/pi";
import { BsPersonFillAdd } from "react-icons/bs";

function Channels() {
  document.title = "Channels | Slack";
  const { id } = useParams();

  return (
    <>
      <div className="flex flex-row justify-between items-start h-12">
        <h1
          className="flex flex-row text-white text-2xl font-bold hover:underline hover:cursor-pointer underline-offset-8"
          title="Show Channel Details"
        >
          Channel ID: {id} <PiCaretDownBold className="ml-2 px-1 mt-1" />
        </h1>
        <button className="inline-flex items-center gap-2 justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md  group">
          <span className="hidden transition-all ease-in-out text-sm group-hover:inline-block">
            Add Members
          </span>
          <BsPersonFillAdd className="inline-block" />
        </button>
      </div>

      <div className="flex w-full">
        <ChatBox receiverId={id} receiverClass="Channel" />
      </div>
    </>
  );
}

export default Channels;
