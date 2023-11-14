import { FaPen } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function MessageDashboard(props) {
  document.title = 'Avion School | Inbox';

  const inbox = [
    {
      name: 'user 1',
      preview: 'Hello!',
      time: '12:00',
    },
    {
      name: 'user 25',
      preview: 'Can you check this out?',
      time: '12:00',
    },
    {
      name: 'user 3',
      preview: 'preview message 2 lorem lorem ipsum',
      time: '12:00',
    },
    {
      name: 'user 5',
      preview: 'preview message 2 lorem lorem ipsum',
      time: '12:00',
    }
  ]

  return (
    <div>
      <div className="flex flex-row justify-between items-start h-12">
        <h1 className="text-white text-2xl font-bold hover:underline underline-offset-8">
          Direct Messages
        </h1>
        <button className="inline-flex items-center gap-2 justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md  group">
          <span className="hidden transition-all ease-in-out text-sm group-hover:inline-block">
            New Message
          </span>
          <FaPen className="inline-block" />
        </button>
      </div>

      <div className="flex flex-col justify-start items-start w-full px-4 py-4 gap-3 bg-indigo-950 rounded-md">     
        {
          inbox.map((message, index) => (
            <Link key={index} className="w-full">
              <div className="inline-flex flex-row gap-4 items-center justify-center text-white w-full bg-indigo-900 px-4 py-3 rounded-md hover:scale-[1.01] hover:brightness-110">
                <BsFillPersonFill className="text-black w-8 h-8 p-1 rounded-lg bg-white" />
                <div className="inline-block w-full">
                  <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-lg font-semibold">{message.name}</h1>
                    <p className="text-sm text-gray-300">{message.time}</p>
                  </div>
                  <div>
                    {message.preview} 
                  </div>
                </div>
              </div>
            </Link>
          ))
        }

      </div>
    </div>
  );
}

export default MessageDashboard;
