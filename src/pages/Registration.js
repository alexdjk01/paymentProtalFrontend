import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import myImage from "../images/registerImage.jpg";

export default function Registration() {


    const [user,setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        streetName:"",
        flatNo:"",
        apartmentNo:"",
        locality:""
    });

    const [errors, setErrors] = useState({});

    const{firstName,lastName , email, password,streetName,flatNo,apartmentNo,locality}=user

    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handerLoginClick = () => {
        navigate('/login');
    };

    const validateForm = () => {
        let fieldsErrors = {};
        // name validation
        if(!firstName.trim())
        {
            fieldsErrors.firstName = "The first name is required!";
        }
        if(!lastName.trim())
        {
            fieldsErrors.lastName = "The last name is required!";
        }
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
        //address validation
        if(!streetName.trim())
        {
            fieldsErrors.streetName = "Name of the street is required!";
        }
        if(locality === "")
        {
                fieldsErrors.locality = "Input a locality!";
        }
        if(!flatNo.trim())
        {
                fieldsErrors.flatNo = "Flat number required!";
        }else if (flatNo <0)
        {
                fieldsErrors.flatNo = "Input a positive flat number!"
        }
        if(!apartmentNo.trim())
        {
                fieldsErrors.apartmentNo = "Apartment number required!";
        }else if (apartmentNo <0)
        {
                fieldsErrors.apartmentNo = "Input a positive apartment number!"
        } 

        setErrors(fieldsErrors)
        // returns true if there are no errors:
        return Object.keys(fieldsErrors).length ===0;
    }

    const handerSaveClick = async (e) =>{
        e.preventDefault();
        const fullName = `${firstName} ${lastName}`;
        const address = `Loc: ${locality}, Str: ${streetName}, Flat: ${flatNo}, Ap: ${apartmentNo}`;

        //Object suitable for backend REST API
        const userRegistered = {
            fullName,
            address,
            email,
            password
        }

        //Validations for registration form

        let formValidated =validateForm();
        if(formValidated)
        {
            console.log("Trying to save user...");
            try{
                const userResult = await axios.post("http://localhost:8080/users", userRegistered);
                console.log("User saved:", userResult.data);
            }catch(err)
            {
                console.error("Error while saving the user!", err);
            }
    
            navigate('/login');
        }
        else
        {
            console.log("Cannot validate the credentials! Try again with good credentials!");
        }

        
        
    }

  return (
    <div>
        <section className="custom-container">
            <div className="container py-5 custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <img src={myImage} alt='Register Image' className='img-fluid custom-register-img' />
                    </div>
                    <div className="col-md-5">
                        <div className="card card-registration ">
                            <div className="card-body p-md-4 text-black custom-card-form">
                                <h3 className="mb-4  text-center">Create your account</h3>


                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                                <label className="form-label" for="firstName">First name</label>
                                                <input type="text" id="firstNameInput" className="form-control form-control-md" placeholder="Enter first name" name="firstName" value={firstName} onChange={onInputChange}/>
                                                {errors.firstName && <small className='text-danger'>{errors.firstName}</small>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" for="lastName" >Last name</label>
                                            <input type="text" id="lastNameInput" className="form-control form-control-md" placeholder="Enter last name" name="lastName" value={lastName} onChange={onInputChange}/>
                                            {errors.lastName && <small className='text-danger'>{errors.lastName}</small>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                                <label className="form-label" for="email">Email</label>
                                                <input type="email" id="emailInput" className="form-control form-control-md" placeholder="Enter email" name="email" value={email} onChange={onInputChange}/>
                                                {errors.email && <small className='text-danger'>{errors.email}</small>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" for="password">Password</label>
                                            <input type="password" id="passwordInput" className="form-control form-control-md" placeholder="Enter password" name="password" value={password} onChange={onInputChange}/>
                                            {errors.password && <small className='text-danger'>{errors.password}</small>}
                                        </div>
                                    </div>
                                </div>


                                <div className="row">

                                    <div className="col-md-12 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" for="streetName">Street Name</label>
                                            <input type="text" id="streetNameInput" className="form-control form-control-md" placeholder="Enter street name"  name="streetName" value={streetName} onChange={onInputChange}/>
                                            {errors.streetName && <small className='text-danger'>{errors.streetName}</small>}
                                        </div>
                                    </div>

                                </div>

                                

                                <div className="row justify-content-center">

                                <div className="col-md-6 mb-4">
                                        <label className="form-label" for="locality">Locality</label>
                                        <select className="form-select" id="localityInput" name="locality" value={locality} onChange={onInputChange}>
                                            <option value="">Select Locality</option>
                                            <option value="Bucuresti S1">Bucuresti S1</option>
                                            <option value="Bucuresti S2">Bucuresti S2</option>
                                            <option value="Bucuresti S3">Bucuresti S3</option>
                                            <option value="Bucuresti S4">Bucuresti S4</option>
                                            <option value="Bucuresti S5">Bucuresti S5</option>
                                            <option value="Bucuresti S6">Bucuresti S6</option>
                                            <option value="Ploiesti">Ploiesti</option>
                                            <option value="Cluj">Cluj</option>
                                            
                                        </select>
                                        {errors.locality && <small className='text-danger'>{errors.locality}</small>}
                                    </div>

                                    <div className="col-md-3 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" for="flatNo">Flat No.</label>
                                            <input type="number" id="flatNumberInput" className="form-control form-control-md" placeholder="Enter Flat No." name="flatNo" value={flatNo} onChange={onInputChange} min='0'/>
                                            {errors.flatNo && <small className='text-danger'>{errors.flatNo}</small>}
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" for="apartmentNo">Apart. No.</label>
                                            <input type="number" id="apartmentNumberInput" className="form-control form-control-md" placeholder="Enter Apartment No." name="apartmentNo" value={apartmentNo} onChange={onInputChange} min='0'/>
                                            {errors.apartmentNo && <small className='text-danger'>{errors.apartmentNo}</small>}
                                        </div>
                                    </div>
                                </div>


                                <div className="col-12 justify-content-center mb-3">
                                        <button type="submit" className="btn custom-btn-login-form " onClick={handerSaveClick}>Register</button>
                                    </div>

                                    <div className="d-flex justify-content-center align-items-center">
                                        <h6 className="mb-3">Already have an account?</h6>
                                        <h6 className="mb-3 ms-1 text-primary" style={{ cursor: 'pointer' , textDecoration: 'underline' }} onClick={handerLoginClick}>Login</h6>
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
