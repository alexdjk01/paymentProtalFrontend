import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/Authentification';
import { useNavigate } from 'react-router-dom';
import visaLogo from '../images/visa-logo.svg';
import maestroLogo from '../images/maestro-logo.svg';
import mastercardLogo from '../images/mastercard-logo.svg';

const ProfileCredentials = ({user}) => {

    const [firstNameRetrieved , setFirstNameRetrieved] = useState();
    const [lastNameRetrieved , setLastNameRetrieved] = useState();
    const [localityRetrieved , setLocalityRetrieved] = useState();
    const [streetNameRetrieved , setStreetNameRetrieved] = useState();
    const [flatNoRetrieved , setFlatNoRetrieved] = useState();
    const [apartmentNoRetrieved , setApartmentNoRetrieved] = useState();

    const [cardNumber, setCardNumber] = useState();
    const [cardCVV, setCardCVV] = useState();
    const [expireDate, setExpireDate] = useState();

    const navigate = useNavigate();
    const {logout} =useAuth();
    const [userEdited,setUserEdited] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        streetName:"",
        flatNo:"",
        apartmentNo:"",
        locality:""
    });
    const{firstName,lastName , email, password,streetName,flatNo,apartmentNo,locality}=userEdited;
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if(user){
            const [firstNameR, lastNameR] = user.fullName.split(' ');
            const addressParts = user.address.split(', ');
            const locality = addressParts[0].split(': ')[1];   
            const streetName = addressParts[1].split(': ')[1]; 
            const flatNo = addressParts[2].split(': ')[1];     
            const apartmentNo = addressParts[3].split(': ')[1]; 
            setFirstNameRetrieved(firstNameR);
            setLastNameRetrieved(lastNameR);
            setLocalityRetrieved(locality);
            setStreetNameRetrieved(streetName);
            setFlatNoRetrieved(flatNo);
            setApartmentNoRetrieved(apartmentNo);

            setUserEdited({
                firstName: firstNameR,
                lastName: lastNameR,
                email: user.email,
                password: user.password,
                streetName: streetName,
                flatNo: flatNo,
                apartmentNo: apartmentNo,
                locality: locality,
              });
        }
    }, [user])

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
    
  
    const onInputChange = (e) => {
        setUserEdited({ ...userEdited, [e.target.name]: e.target.value });
    };


    const handerDeleteClick = async(e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (isConfirmed) {
            const userDeletedResponse = await axios.delete(`http://localhost:8080/users/${user.id}`);
            console.log("Item deleted");
            navigate('/');
        } else {
            console.log("Delete action canceled");
        }
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
                const userResult = await axios.put(`http://localhost:8080/users/${user.id}`, userRegistered);
                console.log("User saved:", userResult.data);
            }catch(err)
            {
                console.error("Error while saving the user!", err);
            }
            logout();
            navigate('/login');
        }
        else
        {
            console.log("Cannot validate the credentials! Try again with good credentials!");
        }

        
        
    }


    if(userEdited)
    {
        return (
            <div>
               <section className="custom-container">
                    <div className="container py-3 custom-container">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="card card-registration ">
                                    <div className="card-body p-md-4 text-black custom-card-form">
                                        <h3 className="mb-4  text-center">Profile and payment</h3>

                                        <div className='row'>
                                            <div className='col-md-6'>
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
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                        <label className="form-label" for="email">Email</label>
                                                        <input type="email" id="emailInput" className="form-control form-control-md" placeholder="Enter email" name="email" value={email} onChange={onInputChange}/>
                                                        {errors.email && <small className='text-danger'>{errors.email}</small>}
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-4">
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
                                        </div>
                                        <div className='col-md-6 px-5'>

                                                            
                                        <div className="col-md-12 mb-4 mx-2">
                                            <div className="form-outline">
                                                    <label className="form-label" for="cardNumber">Card number</label>
                                                    <input type="text" id="cardNumberInput" className="form-control form-control-md" placeholder="Enter card number" name="cardNumber" value={cardNumber} />
                                                    
                                            </div>
                                        </div>

                                        

                                        <div className='row px-0'>
                                        <div className="col-md-4 mb-4">
                                            <div className="form-outline">
                                                    <label className="form-label" for="email">Exp month</label>
                                                    <input type="number" id="expirationDate" className="form-control " name="expirationDate" value={expireDate} min='1'/>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-4">
                                            <div className="form-outline">
                                                    <label className="form-label" for="email">Exp year</label>
                                                    <input type="number" id="expirationDate" className="form-control "  name="expirationDate" value={expireDate} min='1'/>
                                                
                                            </div>
                                        </div>
                                        </div>

                                        <div className='row'>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" for="cardCVV" >Card CVV</label>
                                                <input type="text" id="cardCVVInput" className="form-control form-control-md" placeholder="Enter card CVV" name="cardCVV" value={cardCVV} />
                                            
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-4">
                                            <div className="form-outline">
                                              <img src={visaLogo} alt='Visa Logo' className='payment-logos-size mt-4'/>
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-4">
                                            <div className="form-outline">
                                              <img src={mastercardLogo} alt='Visa Logo' className='payment-logos-size mt-4'/>
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-4">
                                            <div className="form-outline">
                                              <img src={maestroLogo} alt='Visa Logo' className='payment-logos-size mt-4'/>
                                            </div>
                                        </div>
                                        </div>
                                        

                                        <div className='row mt-5'>
                                
                                            <div className="d-flex justify-content-center mt-5 ">
                                                <button type="submit" className="btn custom-btn-invoice-form ">Save changes</button>
                                                
                                            </div>
                                            <div className="d-flex justify-content-center  ">
                                    
                                            <button type="submit" className="btn  " >Delete account</button>
                                            </div>
                                        </div>
                                    </div>
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
    else
    {
        return(
            <div>
                <h1>No user found...</h1>
            </div>
        )
    }
  
}

export default ProfileCredentials;
