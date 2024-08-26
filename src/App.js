import './App.css';
import'../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from './layouts/Navbar';
import Registration from './pages/Registration';
import './css/styles.css'
import Login from './pages/Login';
import StartPage from './pages/StartPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/Authentification';
import DashboardAdmin from './pages/DashboardAdmin';

// REgistration is registering the user into the postgres BD and redirects after save to Login.


function App() {
  return (
    <div className='App'>

      
      <Router>
        <AuthProvider>
          <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
      
    </div>
  );
}

export default App;
