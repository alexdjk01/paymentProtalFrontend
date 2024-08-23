import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Registration() {

    const navigate = useNavigate();

    const handerBackClick = () => {
        navigate('/')
    }

    const handerSaveClick = () =>{
        //AXIOS we need to register the user into the SpringBoot DATABASE
    }


  return (
    <div>
        <section class="vh-100 custom-container d-flex justify-content-center align-items-center">
            <div class="container py-5 custom-container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card card-registration ">
                            <div class="card-body p-md-5 text-black custom-card-form">
                                <h3 class="mb-5 text-uppercase text-center">Register</h3>


                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <div class="form-outline">
                                                <label class="form-label" for="firstName">First name</label>
                                                <input type="text" id="firstNameInput" class="form-control form-control-md" placeholder="Enter first name"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="lastName" >Last name</label>
                                            <input type="text" id="lastNameInput" class="form-control form-control-md" placeholder="Enter last name" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-7 mb-4">
                                        <div class="form-outline">
                                                <label class="form-label" for="email">Email</label>
                                                <input type="email" id="emailInput" class="form-control form-control-md" placeholder="Enter email"/>
                                        </div>
                                    </div>
                                    <div class="col-md-5 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="password">Password</label>
                                            <input type="password" id="passwordInput" class="form-control form-control-md" placeholder="Enter password"/>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">

                                    <div class="col-md-7 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="streetName">Street Name</label>
                                            <input type="text" id="streetNameInput" class="form-control form-control-md" placeholder="Enter street name"/>
                                        </div>
                                    </div>

                                    <div class="col-md-5 mb-4">
                                        <label class="form-label" for="locality">Locality</label>
                                        <select class="form-select" id="localityInput">
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
                                                <input type="number" id="streetNumberInput" class="form-control form-control-md" placeholder="Enter Street No."/>
                                        </div>
                                    </div>
                                    <div class="col-md-4 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="flatNo">Flat No.</label>
                                            <input type="number" id="flatNumberInput" class="form-control form-control-md" placeholder="Enter Flat No."/>
                                        </div>
                                    </div>

                                    <div class="col-md-4 mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="apartmentNo">Apartment No.</label>
                                            <input type="number" id="apartmentNumberInput" class="form-control form-control-md" placeholder="Enter Apartment No."/>
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
