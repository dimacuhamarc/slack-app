import './App.scss';
import Routing from './Routing';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <MainLayout>
      <Routing />
    </MainLayout>
  );
}

export default App;
