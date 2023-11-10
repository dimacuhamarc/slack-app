import { FaPen } from "react-icons/fa";

function Messages(props) {
  document.title = "Direct Message | Slack";

  const inbox = [
    {
      name: 'user 1',
      preview: 'preview message 1 lorem lorem ipsum',
      time: '12:00',
    },
    {
      name: 'user 25',
      preview: 'preview message 2 lorem lorem ipsum',
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
            <>
              <div className="text-white w-full bg-indigo-900 px-4 py-3 rounded-md hover:scale-[1.01]">
                {message.name} {message.time}
                <div>
                  {message.preview} 
                </div>
              </div>
            </>
          ))
        }

      </div>
    </div>
  );
}

export default Messages;
