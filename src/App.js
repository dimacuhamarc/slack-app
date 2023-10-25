import './App.scss';
import Routing from './Routing';
import { DashboardLayout } from './layouts/DashboardLayout';

function App() {
  return (
    <DashboardLayout>
      <Routing />
    </DashboardLayout>
  );
}

export default App;
