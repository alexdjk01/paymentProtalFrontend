import React, { useEffect } from "react";

const InvoiceCard = ({invoice}) => {

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

    const handlerPayment = () => {

    }

    const handlerReport = () => {

    }

    if(invoice)
    {
        return(
            <div class="card text-center m-5 custom-card mx-auto">
                <div class="card-header mb-0">
                    Utilities Invoice
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-4 ">{invoice.titleInvoice}</h5>
                    <div className="justify-content-center mb-3 mx-auto">
                        <div className="row">
                            <div className="col-md-3">
                                <h6>Type</h6>
                            </div>
                            <div className="col-md-3">
                                <h6>Consumption</h6>
                            </div>
                            <div className="col-md-3">
                                <h6>Price/unit</h6>
                            </div>
                            <div className="col-md-3">
                                <h6>Total</h6>
                            </div>
                        </div>
        
                        <div>
                            <p className="custom-margin-top-minus-15px">─────────────────────────────────────────</p>
                        </div>
                        <div class="row custom-margin-top-minus-10px">
                            <div className="col-md-3">
                                <p>Water</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.waterConsumption} mc</p>
                            </div>
                            <div className="col-md-3">
                                <p>{invoice.waterPrice} RON/mc</p>
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
                                <p>{invoice.energyPrice} RON/hWh</p>
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
                                <p>{invoice.gasPrice} RON/mc</p>
                            </div>
                            <div className="col-md-3">
                                <p>{totalGas} RON</p>
                            </div>
                        </div>
                        <p className="custom-margin-top-minus-15px">------------------------------------------------------------------------</p>
                        <h5 className="custom-margin-top-minus-15px">Total: {total} RON </h5>
                        <p className="custom-margin-top-minus-10px custom-p-small"> *Calculated as the total payment for all your utilities</p>
                        <p className="custom-margin-top-minus-15px">------------------------------------------------------------------------</p>
                        <div className="d-flex justify-content-center custom-margin-top-minus-10px">
                            <button type="submit" className="btn btn-danger me-2 btn-lg" onClick={handlerPayment}>Report</button>
                            <button type="submit" className="btn btn-success  btn-lg" onClick={handlerReport}>Pay now</button>
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