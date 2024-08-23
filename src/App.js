import './App.css';
import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layouts/Navbar';
import Registration from './layouts/Registration';
import './css/styles.css'
import Login from './layouts/Login';
import StartPage from './pages/StartPage';

function App() {
  return (
    <div className='App'>
      
      <Navbar/>
      <StartPage/>
      {/* <Registration/>
      <Login/> */}
      
    </div>
  );
}

export default App;
