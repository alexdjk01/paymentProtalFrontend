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
      <h1 className="display-5 mt-5 mb-5 custom-h1-start-page">Welcome to Payment Portal</h1>
      <div className="container-fluid custom-container-start-page">
        <p className='custom-text-start-page'>Activate your account now and save time! </p>
        <p className='custom-secondary-text-start-page'>Enjoy instant payments for your everyday utilities in only a couple of seconds.</p>
        <p className='custom-secondary-text-start-page'>Manage your water, electricity and gas bills in one go!</p>

          <div class="container custom-buttons-startPage-image">
            <div className='row'>
              <div className='col-md-12'>
                <button type="submit" class="btn btn-success btn-lg custom-create-account-button " onClick={handlerRegisterClick}>Create account</button>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 mx-1'>
                <p> Already have an account? Click {' '} 
                  <span 
                    className="text" 
                    style={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold', textDecoration: 'none'  }} 
                    onClick={handlerLoginClick}
                  >
                  here  
                  </span>{' '}
                  to login!
                </p>
                </div>
            </div>
          </div>
      </div>
      
    </div>
  )
}
