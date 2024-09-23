import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/Authentification';
import { useNavigate } from 'react-router-dom';
const PaymentInformation = () => {

    const [cardNumber, setCardNumber] = useState();
    const [cardCVV, setCardCVV] = useState();
    const [expireDate, setExpireDate] = useState();

    
   


    return(
        <div>
               <section className="custom-container">
                    <div className="container py-3 custom-container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 ">
                                <div className="card card-registration ">
                                    <div className="card-body p-md-4 text-black custom-card-form">
                                        <h3 className="mb-4 text-uppercase text-center">Payment method</h3>


                                        
                                            <div className="col-md-12 mb-4">
                                                <div className="form-outline">
                                                        <label className="form-label" for="cardNumber">Card number</label>
                                                        <input type="text" id="cardNumberInput" className="form-control form-control-md" placeholder="Enter card number" name="cardNumber" value={cardNumber} />
                                                        
                                                </div>
                                            </div>

                                        <div className='row'>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <label className="form-label" for="cardCVV" >Card CVV</label>
                                                    <input type="text" id="cardCVVInput" className="form-control form-control-md" placeholder="Enter card CVV" name="cardCVV" value={cardCVV} />
                                                   
                                                </div>
                                            </div>
                                        

                                        
                                            <div className="col-md-3 mb-4">
                                                <div className="form-outline">
                                                        <label className="form-label" for="email">Exp month</label>
                                                        <input type="number" id="expirationDate" className="form-control form-control-md" name="expirationDate" value={expireDate} min='1'/>
                                                       
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-4">
                                                <div className="form-outline">
                                                        <label className="form-label" for="email">Exp year</label>
                                                        <input type="number" id="expirationDate" className="form-control form-control-md"  name="expirationDate" value={expireDate} min='1'/>
                                                       
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

export default PaymentInformation;
