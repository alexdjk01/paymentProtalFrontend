import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {


    const [user,setUser] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        streetName:"",
        streetNo:"",
        flatNo:"",
        apartmentNo:"",
        locality:""
    })

    const{firstName,lastName , email, password,streetName,streetNo,flatNo,apartmentNo,locality}=user

    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const handerBackClick = () => {
        navigate('/');
    };

    const handerSaveClick = async () =>{
        const fullName = `${firstName} ${lastName}`;
        const address = `Loc: ${locality}, Str: ${streetName}, No: ${streetNo}, Flat: ${flatNo}, Ap: ${apartmentNo}`;

        //Object suitable for backend REST API
        const userRegistered = {
            fullName,
            address,
            email,
            password
        }

        try{
            const userResult = await axios.post("http://localhost:8080/users", userRegistered);
            console.log("User saved:", userResult.data);
        }catch(err)
        {
            console.error("Error while saving the user!", err);
        }

        navigate('/login');
        
    }

  return (
    <div>
        <section class="vh-100 custom-container d-flex justify-content-center align-items-center">
            <div class="container py-5 custom-container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card card-registration ">
                            <div class="card-body p-md-4 text-black custom-card-form">
                                <h3 class="mb-4 text-uppercase text-center">Register</h3>


                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <div class="form-outline">
                                                <label class="form-label" for="firstName">First name</label>
                                                <input type="text" id="firstNameInput" class="form-control form-control-md" placeholder="Enter first name" name="firstName" value={firstName} onChange={onInputChange}/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="lastName" >Last name</label>
                                            <input type="text" id="lastNameInput" class="form-control form-control-md" placeholder="Enter last name" name="lastName" value={lastName} onChange={onInputChange}/>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-7 mb-4">
                                        <div class="form-outline">
                                                <label class="form-label" for="email">Email</label>
                                                <input type="email" id="emailInput" class="form-control form-control-md" placeholder="Enter email" name="email" value={email} onChange={onInputChange}/>
                                        </div>
                                    </div>
                                    <div class="col-md-5 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="password">Password</label>
                                            <input type="password" id="passwordInput" class="form-control form-control-md" placeholder="Enter password" name="password" value={password} onChange={onInputChange}/>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">

                                    <div class="col-md-7 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="streetName">Street Name</label>
                                            <input type="text" id="streetNameInput" class="form-control form-control-md" placeholder="Enter street name"  name="streetName" value={streetName} onChange={onInputChange}/>
                                        </div>
                                    </div>

                                    <div class="col-md-5 mb-4">
                                        <label class="form-label" for="locality">Locality</label>
                                        <select class="form-select" id="localityInput" name="locality" value={locality} onChange={onInputChange}>
                                            <option selected>Select Locality</option>
                                            <option value="1">Bucuresti S1</option>
                                            <option value="2">Bucuresti S2</option>
                                            <option value="3">Bucuresti S3</option>
                                            <option value="4">Bucuresti S4</option>
                                            <option value="5">Bucuresti S5</option>
                                            <option value="6">Bucuresti S6</option>
                                            <option value="7">Ploiesti</option>
                                            <option value="8">Cluj</option>
                                            
                                        </select>
                                    </div>
                            
                                </div>



                                <div class="row">
                                    <div class="col-md-4 mb-4">
                                        <div class="form-outline">
                                                <label class="form-label" for="streetNo">Street No.</label>
                                                <input type="number" id="streetNumberInput" class="form-control form-control-md" placeholder="Enter Street No." name="streetNo" value={streetNo} onChange={onInputChange}/>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="flatNo">Flat No.</label>
                                            <input type="number" id="flatNumberInput" class="form-control form-control-md" placeholder="Enter Flat No." name="flatNo" value={flatNo} onChange={onInputChange}/>
                                        </div>
                                    </div>

                                    <div class="col-md-4 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="apartmentNo">Apartment No.</label>
                                            <input type="number" id="apartmentNumberInput" class="form-control form-control-md" placeholder="Enter Apartment No." name="apartmentNo" value={apartmentNo} onChange={onInputChange}/>
                                        </div>
                                    </div>
                                </div>


                                <div class="d-flex justify-content-center">
                                    <button type="reset" class="btn btn-danger btn-lg me-2" onClick={handerBackClick}>Back</button>
                                    <button type="submit" class="btn btn-success btn-lg" onClick={handerSaveClick}>Save</button>
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
