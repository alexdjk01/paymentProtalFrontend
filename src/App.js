import './App.css';
import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from './layouts/Navbar';
import Registration from './layouts/Registration';
import './css/styles.css'
import Login from './layouts/Login';
import StartPage from './pages/StartPage';

function App() {
  return (
    <div className='App'>
      
      <Router>
        <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
