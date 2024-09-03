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

    const handlerBackClick = () =>{
        navigate("/");
    }

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
                                <h3 className="mb-5 text-uppercase text-center">Login</h3>

                                
                                    <div className="col-md mb-4">
                                        <div className="form-outline">
                                                <label className="form-label" for="email">Email</label>
                                                <input type="email" id="emailInput" className="form-control form-control-md" placeholder="Enter email" name="email" value={email} onChange={onInputChange}/>
                                                {errors.email && <small className='text-danger'>{errors.email}</small>}
                                        </div>
                                    </div>
                                    <div className="col-md mb-5">
                                        <div className="form-outline">
                                            <label className="form-label" for="password">Password</label>
                                            <input type="password" id="passwordInput" className="form-control form-control-md" placeholder="Enter password" name='password' value={password} onChange={onInputChange}/>
                                            {errors.password && <small className='text-danger'>{errors.password}</small>}
                                        </div>
                                    </div>


                                    <div className="d-flex justify-content-center">
                                        <button type="reset" className="btn btn-danger btn-lg me-2" onClick={handlerBackClick}>Back</button>
                                        <button type="submit" className="btn btn-success btn-lg" onClick={handlerLoginClick}>Login</button>
                                    </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
