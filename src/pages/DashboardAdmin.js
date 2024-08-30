import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Authentification'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        startBillingPeriod:"",
        endBillingPeriod:""
    });

    const [clients, setClients] = useState([]);

    const{waterConsumption,gasConsumption , energyConsumption,startBillingPeriod,endBillingPeriod}=invoice;

    const [utilityPrices, setUtilityPrices] = useState({
        waterPriceAdjust: "",
        gasPriceAdjust: "",
        electricityPriceAdjust: ""
    });

    const {waterPriceAdjust,gasPriceAdjust ,electricityPriceAdjust} = utilityPrices;

    useEffect(() => {
        console.log("Client List:", clients);
    }, [clients]);

    //load the informations form the database and put them into this local variable when the page laods 
    // => the local variable has the values before the buttons render anything.
    useEffect(() => {
        const fetchUtilityPrices = async () => {
            try{
                const responseArrayPrices = await axios.get("http://localhost:8080/utilityPrices");
                const utilityPricesArray = responseArrayPrices.data.reduce((result,item) => {
                    result[`${item.utilityType}PriceAdjust`] = item.pricePerUnit;
                    return result;
                },{});
                setUtilityPrices(utilityPricesArray);
            }catch(err)
            {
                console.error("Failed to fetch utility prices", err);
            }
        };

        const fetchClients = async () => {
            try{
                const responseArrayClients = await axios.get("http://localhost:8080/users");
                setClients(responseArrayClients.data);
            }catch(err)
            {
                console.error("Error fatching the clients: ", err);
            }
        }

        fetchUtilityPrices();
        fetchClients();
    }, []);

    //if user does not exists, give this message, else render using the last return statement.
    if(!user)
        {
            return <p>Please log in to access this page.</p>
        }

        //onChange for invoice obj
    const onInputChangeInvoice = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };

    //on change for utilityPrice obj
    const onInputChangeUtility = (e) => {
        setUtilityPrices({ ...utilityPrices, [e.target.name]: e.target.value });
    };

    //render for adjuster prices
    const handlerAdjsutPricesClick = () => {
        setShowAdjustPrices(true);
        setShowInvoiceGenerator(false);
    };

    //render for generating the invoice
    const handlerGenerateInvoicesClick = () => {
        setShowInvoiceGenerator(true);
        setShowAdjustPrices(false);
    };

    const handlerSetPricesClick = async() =>
    {
        try {
            await Promise.all([
                axios.put(`http://localhost:8080/utilityPrices/water`, { pricePerUnit: utilityPrices.waterPriceAdjust }),
                axios.put(`http://localhost:8080/utilityPrices/gas`, { pricePerUnit: utilityPrices.gasPriceAdjust }),
                axios.put(`http://localhost:8080/utilityPrices/electricity`, { pricePerUnit: utilityPrices.electricityPriceAdjust }) // Assuming electricity is the energy utility
            ]);
            alert("Prices updated successfully!");
        } catch (error) {
            console.error("Failed to update utility prices", error);
        }
    };

    const handlerGenerateInvoiceClick = () =>{
            console.log(invoice.billingPeriod);
    }

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
                                    <div className="mb-4">
                                        <div className="form-outline px-5">
                                                <label className="form-label h6" htmlFor="waterConsumption">Water Consumption</label>
                                                <input type="number" id="waterConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="waterConsumption" value={waterConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                                <small className="text-body-secondary">Current pricing: {utilityPrices.waterPriceAdjust} RON/m3</small>
                                        </div>
                                    </div>

                                    <div className=" mb-4">
                                        <div className="form-outline px-5 ">
                                                <label className="form-label h6" htmlFor="energyConsumption">Energy Consumption</label>
                                                <input type="number" id="energyConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="energyConsumption" value={energyConsumption} onChange={onInputChangeInvoice}  min="0"/>                                       
                                                <small className="text-body-secondary">Current pricing: {utilityPrices.electricityPriceAdjust} RON/kWh</small>
                                        </div>
                                    </div>

                                    <div className=" mb-4">
                                        <div className="form-outline px-5">
                                            <label className="form-label h6" htmlFor="gasConsumption" >Gas Consumption</label>
                                            <input type="number" id="gasConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="gasConsumption" value={gasConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                            <small className="text-body-secondary">Current pricing: {utilityPrices.gasPriceAdjust} RON/m3</small>
                                        </div>
                                    </div>

                                    <div className="row justify-content-center mb-5">
                                        <div className="col-md-4 ">
                                                <div className="form-outline">
                                                <label className="form-label h6" htmlFor="startBillingPeriod" >Start Billing Period</label>
                                                <input type="date" id="startBillingPeriodInput" className="form-control form-control-md"  name="startBillingPeriod" value={startBillingPeriod} onChange={onInputChangeInvoice} />
                                            </div>
                                        </div>

                                        <div className="col-md-4 ">
                                            <div className="form-outline">
                                                <label className="form-label h6" htmlFor="endBillingPeriod" >End Billing Period</label>
                                                <input type="date" id="endBillingPeriodInput" className="form-control form-control-md"  name="endBillingPeriod" value={endBillingPeriod} onChange={onInputChangeInvoice} />
                                            </div>
                                        </div>
                                
                                    </div>
                                                                            
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary btn-lg" onClick={handlerGenerateInvoiceClick}>Generate</button>
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
                                                    <label className="form-label h6" htmlFor="waterConsumption">Water Price</label>
                                                    <input type="number" id="waterPriceInput" className="form-control form-control-md" placeholder="Amount" name="waterPriceAdjust" value={utilityPrices.waterPriceAdjust|| 0} onChange={onInputChangeUtility} min="0"/>
                                                
                                            </div>
                                        </div>

                                        <div className=" mb-4">
                                            <div className="form-outline px-5">
                                                    <label className="form-label h6" htmlFor="energyConsumption">Energy Price</label>
                                                    <input type="number" id="energyPriceInput" className="form-control form-control-md" placeholder="Amount" name="electricityPriceAdjust" value={utilityPrices.electricityPriceAdjust|| 0} onChange={onInputChangeUtility} min="0"/>
                                                
                                            </div>
                                        </div>

                                        <div className=" mb-4">
                                            <div className="form-outline px-5">
                                                <label className="form-label h6" htmlFor="gasConsumption" >Gas Price</label>
                                                <input type="number" id="gasPriceInput" className="form-control form-control-md" placeholder="Amount" name="gasPriceAdjust" value={utilityPrices.gasPriceAdjust|| 0} onChange={onInputChangeUtility} min="0"/>
                                            
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
