import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function StartPage() {

  const navigate = useNavigate();

  const handlerLoginClick = () => {
    navigate('/login');
  }

  const handlerRegisterClick = () => {
    navigate('/register');
  }



  return (


    <div>
      <h1 className="display-5 mt-5 mb-5 custom-h1-start-page">Welcome to Portal Payment Application</h1>
      <div className="container custom-container-start-page">
        <p className='custom-text-start-page'>Login or Register into the application in order to manage your utility payments</p>

          <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-danger btn-lg me-2" onClick={handlerRegisterClick}>Register</button>
              <button type="submit" class="btn btn-success btn-lg me-2" onClick={handlerLoginClick}>Login</button>
          </div>
      </div>
      
    </div>
  )
}
