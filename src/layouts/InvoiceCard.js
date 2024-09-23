import React, { useEffect, useState } from "react";
import { useAuth } from '../contexts/Authentification';
import axios from 'axios';

const InvoiceCard = ({invoice}) => {

    ////// RE-RENDER INVOICE AFTER CLICKING PAY OR REPORT SO IT SHOWS ALREADY PAID< ALREADY REORTED!

    const [paid, setPaid] = useState(invoice.paid);
    const {userAuth} = useAuth();

    function calculateTotalForEach(a,b) {
        const resultRounded =(a*b).toFixed(2);
        return parseFloat(resultRounded);
    }

    let totalWater = calculateTotalForEach(invoice.waterConsumption,invoice.waterPrice);
    let totalEnergy = calculateTotalForEach(invoice.energyConsumption,invoice.energyPrice);
    let totalGas = calculateTotalForEach(invoice.gasConsumption,invoice.gasPrice);

    let totalSum = totalEnergy+totalGas+totalWater;
    let totalSumRounded = totalSum.toFixed(2);
    let total = parseFloat(totalSumRounded);

    let startBillingPeriod = invoice.billingPeriod.split(' - ')[0];
    let endBillingPeriod = invoice.billingPeriod.split(' - ')[1];
    let tva = (0.19*total).toFixed(2);

    function formateDate(dateString)
    {
        const [day, month, year] = dateString.split('/');
        return `${month}/${day}/${year}`; 
    }

    function getDaysDifference(invoice)
    {
        const invoiceEndDateStr = invoice.billingPeriod.split(' - ')[1];
        console.log(invoiceEndDateStr);
        const invoiceEndDateStrFormatted = formateDate(invoiceEndDateStr)
        console.log(invoiceEndDateStrFormatted);
        const date1 = new Date(invoiceEndDateStrFormatted);
        const date2 = new Date();
        console.log(date1,date2);
        const timeDifferenceInMillisecons = Math.abs(date2-date1);
        const timeDifferenceInDays = Math.ceil(timeDifferenceInMillisecons / (1000*60*60*24));
        if(date2 > date1)
        {
            
            return `Issued ${timeDifferenceInDays} days ago`;
        }
        else
        {
            return `Upcomming payment starting in ${timeDifferenceInDays} days `
        }
        
    }

    const handlerPayment = async() => {
        invoice.paid=true;
        console.log(invoice);
        try{
            const updatedInvoice = await axios.put(`http://localhost:8080/invoices/${invoice.id}`, invoice);
            console.log(updatedInvoice);
            setPaid(true);
        }
        catch(e)
        {
            console.error("Invoice couldn't be updated: ", e);
        }
    }

    const handlerReport = async() => {
        invoice.reported=false;
        console.log(invoice);
        try{
            const updatedInvoice = await axios.put(`http://localhost:8080/invoices/${invoice.id}`, invoice);
            console.log(updatedInvoice);
        }
        catch(e)
        {
            console.error("Invoice couldn't be updated: ", e);
        }
    }

    if(invoice)
    {
        return(
            <div class="card text-center m-5 custom-card mx-auto">
                <div class="card-header mb-0">
                    Payment Portal Utilities Invoice
                </div>
                <div class="card-body mt-5 mx-5">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex flex-column justify-content-start  text-start">
                                <p className="custom-bold-text-invoice">Issued to: </p>
                                <p className="custom-small-text">{userAuth.fullName}</p>
                                <p className="custom-bold-text-invoice">Address: </p>
                                <p className="custom-small-text">{userAuth.address}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex flex-column justify-content-end  text-end mx-1">
                                <p className="custom-bold-text-invoice mb-4">Invoice ID: {invoice.id}</p>
                                <p className="custom-p-invoice-small">Start Date: {startBillingPeriod}</p>
                                <p className="custom-p-invoice-small">End Date: {endBillingPeriod}</p>
                            
                            </div>
                        </div>
                    </div>

                    
                    <div className="justify-content-center mb-3 mt-4">
                        <div className="row">
                            <div className="col-md-3">
                                <p className="custom-bold-text-invoice">Description</p>
                            </div>
                            <div className="col-md-3">
                                <p className="custom-bold-text-invoice">Quantity</p>
                            </div>
                            <div className="col-md-3">
                                <p className="custom-bold-text-invoice">Unit Price</p>
                            </div>
                            <div className="col-md-3">
                                <p className="custom-bold-text-invoice">Total</p>
                            </div>
                        </div>
        
                        <div>
                            <p >─────────────────────────────────────────</p>
                        </div>
                        <div class="row custom-margin-top-minus-10px">
                            <div className="col-md-3">
                                <p>Water</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.waterConsumption} mc</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.waterPrice} </p>
                            </div>
                            <div className="col-md-3">
                                <p>{totalWater} RON</p>
                            </div>
                        </div>
        
                        <div class="row custom-margin-top-minus-10px">
                            <div className="col-md-3">
                                <p>Electricity</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.energyConsumption} kWh</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.energyPrice} </p>
                            </div>
                            <div className="col-md-3">
                                <p>{totalEnergy} RON</p>
                            </div>
                        </div>
        
                        <div class="row custom-margin-top-minus-10px">
                            <div className="col-md-3">
                                <p>Gas</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.gasConsumption} mc</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.gasPrice} </p>
                            </div>
                            <div className="col-md-3">
                                <p>{totalGas} RON</p>
                            </div>
                        </div>
                        <p >─────────────────────────────────────────</p>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex flex-column justify-content-start  text-start mx-3">
                                    <p className="custom-bold-text-invoice">Subtotal:</p>
                                    
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="d-flex flex-column justify-content-end  text-end mx-4">
                                    <p className="custom-bold-text-invoice">{total} RON </p>
                                    <p className="custom-p-small mt-2">*TVA 19% |  {tva} RON</p>
                                </div>
                            </div>
                        </div>
                       
                        <>
                        {invoice.paid ? (
                            <div className="row justify-content-center mt-3">
                                <div className="col-12 text-center mb-3">
                                    <button disabled type="submit" className="btn custom-btn-invoice-form">Invoice paid</button>
                                </div>
                            </div>
                        ) : (
                            <div className="row justify-content-center mt-3">
                                <div className="col-12 text-center mb-3">
                                    <button type="submit" className="btn custom-btn-invoice-form" onClick={handlerPayment}>Pay now</button>
                                </div>
                            </div>
                        )}
                        </>
                        
                        <div>
                            <div className="col-12 text-center">
                                <p className="custom-bold-text-invoice" style={{ cursor: 'pointer', marginTop:"-10px" , color:"red"}} onClick={handlerReport}>Report an issue</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="card-footer text-body-secondary">
                    {getDaysDifference(invoice)}
                </div>
            </div>
           );
    }
    else
    {
        return (
            <h5>Invoices not found!</h5>
        )
    }
   
};

export default InvoiceCard;