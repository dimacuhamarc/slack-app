import { FormatName } from '../services/utilities';
import MyChannels from '../components/Dashboard/MyChannels';
import MyMessages from '../components/Dashboard/MyMessages';

function Dashboard(props) {
  document.title = 'Avion School | Slack';
  const user = JSON.parse(localStorage.getItem('user'));
  const rL = JSON.parse(localStorage.getItem("recentList"));

  return (
    <div>
      <h1 className="text-white text-4xl font-normal">Welcome, <span className='font-bold text-indigo-300 underline underline-offset-4'>{user && FormatName(user.email)}</span>!</h1>
      <MyChannels/>
      {rL && <MyMessages/>}
    </div>
  );
}

export default Dashboard;
