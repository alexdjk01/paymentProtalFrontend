import React from 'react'

import { useNavigate , useLocation} from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const handlerLoginClick = () => {
    navigate('/login');
  }

  const handlerRegisterClick = () => {
    navigate('/register');
  }




  return (
    <div>


        <nav className="navbar navbar-expand-lg navbar-dark bg-white custom-navbar">
        <div className="container-fluid pe-5">
            <a className="navbar-brand " href="/" style={{ color: 'black' }}>Payment Portal Full Stack App</a>

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
            {location.pathname !== '/dashboard' ? (
              <>
              <button className="btn btn-outline-dark ms-2 custom-buttons-navbar" style={{ color: 'black' }} onClick={handlerRegisterClick}>Register</button>
              <button className="btn btn-outline-dark ms-3 custom-buttons-navbar" style={{ color: 'black' }} onClick={handlerLoginClick}>Login</button>
              </>
            ) : (
              <button className="btn btn-outline-dark ms-3 custom-buttons-navbar" style={{ color: 'black' }}>Profile</button> 
            )}
            </div>
        </div>
        </nav>

      
    </div>
  )
}
