import { MainNav } from "../components/MainNav";
import { AiFillCaretDown } from "react-icons/ai";

function Dashboard(props) {
  return (
    <div>
      <MainNav />
      <div className="bg-indigo-800 bg-opacity-70 w-64 h-screen fixed left-16 z-[0] p-4 pl-8 rounded-e-xl text-gray-200">
        <div className="flex flex-row items-center border-b-2 border-indigo-50 px-2">
          <h1 className="font-bold text-xl">Avion School </h1>
          <span className="text-xs"><AiFillCaretDown/></span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
