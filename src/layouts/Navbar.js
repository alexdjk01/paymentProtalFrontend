import React from 'react'

export default function Navbar() {
  return (
    <div>


        <nav className="navbar navbar-expand-lg navbar-dark bg-white custom-navbar">
        <div className="container-fluid pe-5">
            <a className="navbar-brand " href="#" style={{ color: 'black' }}>Payment Portal Full Stack App</a>

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
            <button className="btn btn-outline-dark ms-2 custom-buttons-navbar" style={{ color: 'black' }}>Register</button>
            <button className="btn btn-outline-dark ms-3 custom-buttons-navbar" style={{ color: 'black' }}>Login</button>
            </div>
        </div>
        </nav>

      
    </div>
  )
}
