import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormatName } from "../../services/utilities";
import { IoInformationCircle } from "react-icons/io5";
import ReceiverDetails from "./ReceiverDetails";

function Messages() {
  const { id } = useParams();
  const [receiverName, setReceiverName] = useState("");
  const [receiverClass, setReceiverClass] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const storedUserList = JSON.parse(localStorage.getItem('userList'));
  const [showReceiverDetails, setReceiverDetails] = useState(false);
  document.title = `Avion Slack | ${FormatName(receiverName)}`;

  useEffect(() => {
    function fetchReceiverInfo() {
      try {
        storedUserList.filter((user) => {
          if (user.id === parseInt(id, 10)) {
            setReceiverName(user.email);
            setReceiverId(user.id);
            setReceiverClass(user.class);
            console.log(user.id + " = " + id)
          }
        });
      } catch (error) {
        console.error("Error fetching receiver info:", error);
      }
    }
    fetchReceiverInfo();
  },[storedUserList, id]);

  const openReceiverDetails = () => {
    setReceiverDetails(true);
  }

  const closeReceiverDetails = () => {
    setReceiverDetails(false);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-start h-12">
        <h1
          className="flex flex-row text-white w-full text-2xl font-bold hover:underline hover:cursor-pointer underline-offset-8"
          title="Show Channel Details"
          onClick={openReceiverDetails}
        >
          {FormatName(receiverName)}
        </h1>
        <IoInformationCircle 
          className="text-white text-2xl mt-1 cursor-pointer" 
          onClick={openReceiverDetails} 
        /> 
      </div>
      <div className="flex w-full h-full">
        <ReceiverDetails isOpen={showReceiverDetails} onClose={closeReceiverDetails} receiverId={receiverId} receiverName={receiverName}/>
      </div>
    </>
  )
}

export default Messages;