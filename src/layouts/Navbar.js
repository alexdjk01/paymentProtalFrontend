import React from 'react'
import { useAuth } from '../contexts/Authentification';

import { useNavigate , useLocation} from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const {logout} =useAuth();

  const handlerLoginClick = () => {
    navigate('/login');
  }

  const handlerRegisterClick = () => {
    navigate('/register');
  }

  const handlerProfileClick = () => {
    navigate('/profile');
  }

  const handlerLogoutClick = () => {
    logout();
    navigate('/');
  }



  return (
    <div>


        <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid pe-5">
            <a className="navbar-brand " href="/" style={{ color: 'black' }} onClick={handlerLogoutClick}>Payment Portal Full Stack App</a>

            <button 
                className="navbar-toggler" 
                type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex ms-auto pe-5">
            {(location.pathname !== '/dashboard' && location.pathname!=='/dashboardAdmin') ? (
              <>
              <button className="btn btn-outline-dark ms-2 custom-buttons-navbar" style={{ color: 'black' }} onClick={handlerRegisterClick}>Register</button>
              <button className="btn btn-outline-dark ms-3 custom-buttons-navbar" style={{ color: 'black' }} onClick={handlerLoginClick}>Login</button>
              </>
            ) : (
              <>
              <button className="btn btn-outline-dark ms-3 custom-buttons-navbar" style={{ color: 'black' }} onClick={handlerProfileClick}>Profile</button> 
              <button className="btn btn-outline-dark ms-3 custom-buttons-navbar" style={{ color: 'black' }} onClick={handlerLogoutClick}>Logout</button> 
              </>
            )}
            </div>
        </div>
        </nav>

      
    </div>
  )
}
