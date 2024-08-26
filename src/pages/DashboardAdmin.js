import React, { useState } from 'react'
import { useAuth } from '../contexts/Authentification'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// cand apas pe adjust prices trebuie sa iau din baza de date preturile, sa populez inputurile si sa las adminu sa schimbe sa dea update
//daca nu exista intrari in baza de date cu preturile, trebuie sa le creeze ( poate fac o fucntie createUpdateUtilityPrices in SpringBoot)
// preturile sunt randate in generatorul de invoices as read only , si ajuta la calculatrea totalului de plata
// in invoice trebuie sa fac si un drop down sau ceva habar n am in care sa selectez userul pentru care eu fac invoice
// asa se genereaza invoice ul care trebuie sa fie luat cand userul se logheaza si pus pe dashboardul lui
//mai trb puse titleofInvoice, billing period la invoice si puse bine la adjuster ca sunt luate copy pase
// ???? oare pot sa fac un template de Invoice pentru a fii folosit si la user? nu cred

export default function DashboardAdmin() {

    const {user} = useAuth();
    const navigate = useNavigate();

    const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
    const [showAdjustPrices, setShowAdjustPrices] = useState(false);

    const [invoice,setInvoice] = useState({
        waterConsumption:"",
        gasConsumption:"",
        energyConsumption:"",
        waterPrice:"",
        gasPrice:"",
        energyPrice:"",
        billingPeriod:"",
        titleInvoice:""
    });

    const{waterConsumption,gasConsumption , energyConsumption, waterPrice,gasPrice,energyPrice,billingPeriod,titleInvoice}=invoice;
    

    const [utilityPrices, setUtilityPrices] = useState({
        utilityType:"",
        pricePerUnit:""
    });

    const{utilityType,pricePerUnit }=utilityPrices;

    const onInputChangeInvoice = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };

    const onInputChangeUtility = (e) => {
        setUtilityPrices({ ...utilityPrices, [e.target.name]: e.target.value });
    };

    if(!user)
    {
        return <p>Please log in to access this page.</p>
    }


    const handlerAdjsutPricesClick = () => {
         setShowAdjustPrices(true);
         setShowInvoiceGenerator(false);
    };

    const handlerGenerateInvoicesClick = () => {
        setShowInvoiceGenerator(true);
        setShowAdjustPrices(false);
    };

    const handlerSetPricesClick = () =>
    {
        //update or create prices and save in the database
    }


  console.log(user);
  return (
    <div>
       <h1>Welcome , {user.fullName} || ROLE: ADMIN</h1>

       <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary btn-lg me-2" onClick={handlerAdjsutPricesClick}>Adjust Prices</button>
                <button type="submit" className="btn btn-primary btn-lg" onClick={handlerGenerateInvoicesClick}>Generate Invoices</button>
        </div>

        {showInvoiceGenerator && (
        <section className="vh-100 custom-container d-flex justify-content-center align-items-center">
                <div className="container py-5 custom-container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card card-registration ">
                                <div className="card-body p-md-4 text-black custom-card-form">
                                    <h3 className="mb-4 text-uppercase text-center">Invoice Generator</h3>


                                  

                                    <div className="row">
                                        <div className="col-md-4 mb-4">
                                            <div className="form-outline">
                                                    <label className="form-label" for="waterConsumption">Water m3</label>
                                                    <input type="number" id="waterConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="waterConsumption" value={waterConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-4">
                                            <div className="form-outline">
                                                <label className="form-label" for="gasConsumption" >Gas m3</label>
                                                <input type="number" id="gasConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="gasConsumption" value={gasConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                            
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-4">
                                            <div className="form-outline">
                                                    <label className="form-label" for="energyConsumption">Energy kWh</label>
                                                    <input type="number" id="energyConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="energyConsumption" value={energyConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {showAdjustPrices && (
            <section className="vh-100 custom-container d-flex justify-content-center align-items-center">
            <div className="container py-5 custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card card-registration ">
                            <div className="card-body p-md-4 text-black custom-card-form">
                                <h3 className="mb-4 text-uppercase text-center">Price Adjuster</h3>


                                
                                        <div className=" mb-4">
                                            <div className="form-outline px-5">
                                                    <label className="form-label" for="waterConsumption">Water Price</label>
                                                    <input type="number" id="waterConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="waterConsumption" value={waterConsumption} onChange={onInputChangeInvoice}/>
                                                
                                            </div>
                                        </div>
                                        <div className=" mb-4">
                                            <div className="form-outline px-5">
                                                <label className="form-label" for="gasConsumption" >Gas Price</label>
                                                <input type="number" id="gasConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="gasConsumption" value={gasConsumption} onChange={onInputChangeInvoice}/>
                                            
                                            </div>
                                        </div>
                                        <div className=" mb-4">
                                            <div className="form-outline px-5">
                                                    <label className="form-label" for="energyConsumption">Energy Price</label>
                                                    <input type="number" id="energyConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="energyConsumption" value={energyConsumption} onChange={onInputChangeInvoice}/>
                                                
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary btn-lg" onClick={handlerSetPricesClick}>Set</button>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        )}
    </div>
  )
}
