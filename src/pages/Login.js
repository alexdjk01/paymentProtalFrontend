import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/Authentification';
import myImage from '../images/loginImage.jpg'

export default function Login() {

    const navigate = useNavigate();

    const {login} =useAuth();

    const [user,setUser] = useState({
        email:"",
        password:""
    });

    const [errors, setErrors] = useState({});

    const{email, password}=user

 

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const validateForm = () => {
        let fieldsErrors = {};
        //email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email.trim())
        {
            fieldsErrors.email = "Email is required!";
        } else if (!emailPattern.test(email))
        {
            fieldsErrors.email = "Email is invalid!";
        }
        //password validation
        if(!password.trim())
        {
            fieldsErrors.password = "Password is required!";
        } else if (password.length < 6){
            fieldsErrors.password = "Minimum length allowed is 6 characters!";
        }
        setErrors(fieldsErrors)
        // returns true if there are no errors:
        return Object.keys(fieldsErrors).length ===0;
    }

    function isValidAdminEmail(email) {
        const adminEmailPattern = /@pp\.admin\.ro$/;
      
        return adminEmailPattern.test(email);
      }

    const  handlerRegisterClick = () => {
        navigate('/register');
    }

    const handlerLoginClick = async(e) =>{
        e.preventDefault();
        let fieldsErrors = {};
        let formValidated =validateForm();
            if(formValidated)
            {
                if(isValidAdminEmail(email))
                {
                    try{
                        const receivedAdmin = await axios.get(`http://localhost:8080/admins/${email}`);
                            console.log(receivedAdmin.data);
                            const adminSaved = receivedAdmin.data;
                            if(adminSaved.password === password)
                            {
                                login(adminSaved);
                                navigate("/dashboardAdmin")
                            }
                            else
                            {
                               
                                fieldsErrors.password = "Password is wrong!";
                                
                            }
                            
                        
                    }
                    catch(err)
                    {
                        console.error('Login failed: ', err);
                        fieldsErrors.email = "Email not found!"
                    }
                }
                else
                {
                    try{
                        const receivedUser = await axios.get(`http://localhost:8080/users/${email}`);
                   
                        
                            console.log("Login attempt with user credentials...");
                            console.log(receivedUser.data);
                            const userSaved = receivedUser.data;
                            if(userSaved.password === password)
                            {
                                login(userSaved);
                                navigate("/dashboard")
                            }
                            else
                            {
                               
                                fieldsErrors.password = "Password is wrong!";
                                
                            }
                            
                        
                    }
                    catch(err)
                    {
                        console.error('Login failed: ', err);
                        fieldsErrors.email = "Email not found!"
                    }
                }
                
                setErrors(fieldsErrors)
            }
    }

  return (
    <div>
        <section className="custom-container">
            <div className="container py-5 custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <img src={myImage} alt='Register Image' className='img-fluid custom-login-img' />
                    </div>

                    <div className="col-md-4">
                        <div className="card card-registration ">
                            <div className="card-body p-md-5 text-black custom-card-form">
                                <h3 className="mb-5  text-center">Welcome to P-Portal</h3>

                                
                                    <div className="col-md mb-4">
                                        <div className="form-outline">
                                                
                                                <input type="email" id="emailInput" className="form-control form-control-md" placeholder="Enter email" name="email" value={email} onChange={onInputChange}/>
                                                {errors.email && <small className='text-danger'>{errors.email}</small>}
                                        </div>
                                    </div>
                                    <div className="col-md mb-3">
                                        <div className="form-outline">
                                      
                                            <input type="password" id="passwordInput" className="form-control form-control-md" placeholder="Enter password" name='password' value={password} onChange={onInputChange}/>
                                            {errors.password && <small className='text-danger'>{errors.password}</small>}
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="rememberEmailCheckbox" />
                                            <label className="form-check-label" htmlFor="rememberEmailCheckbox">
                                            Remember Email
                                            </label>
                                        </div>
                                        
                                        <a href="/forgot-password" className="text-primary">Forgot Password?</a>
                                        </div>

                                    <div className="col-12 justify-content-center mb-3">
                                        <button type="submit" className="btn custom-btn-login-form " onClick={handlerLoginClick}>Log in</button>
                                    </div>

                                    <div className="d-flex justify-content-center align-items-center">
                                        <h6 className="mb-3">New to Payment Portal?</h6>
                                        <h6 className="mb-3 ms-1 text-primary" style={{ cursor: 'pointer' , textDecoration: 'underline' }} onClick={handlerRegisterClick}>Register</h6>
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <p className='mt-5 custom-small-text'>Services may be provided by Payment Portal Financial Services or Portal Financial International Services, LLCST MMTSLS# 99999, which are licensed as Money Transmitters by the New York State Department of Financial Services.  See terms and conditions for details.</p>
        <p className=' custom-small-text'>© 2024 Payment Portal Holdings, Inc. All Rights Reserved</p>
    </div>
  )
}
