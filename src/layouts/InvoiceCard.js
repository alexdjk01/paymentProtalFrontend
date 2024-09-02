import React from "react";

const InvoiceCard = ({invoice}) => {

    function calculateTotalForEach(a,b) {
        return a*b;
    }

    let totalWater = calculateTotalForEach(invoice.waterConsumption,invoice.waterPrice);
    let totalEnergy = calculateTotalForEach(invoice.energyConsumption,invoice.energyPrice);
    let totalGas = calculateTotalForEach(invoice.gasConsumption,invoice.gasPrice);

    let total = totalEnergy+totalGas+totalWater;

    const handlerPayment = () => {

    }

    const handlerReport = () => {

    }

    if(invoice)
    {
        return(
            <div class="card text-center m-5 custom-card mx-auto">
                <div class="card-header mb-2">
                    Utilities Invoice
                </div>
                <div class="card-body">
                    <h5 class="card-title mb-5 ">{invoice.titleInvoice}</h5>
                    <div className="justify-content-center mb-3 mx-auto">
                        <div class="row">
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
                            <p>─────────────────────────────────────────────────</p>
                        </div>
                        
                        
        
                        <div class="row">
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
        
                        <div class="row">
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
        
                        <div class="row">
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
        
                        <div>
                            <p>----------------------------------------------------------------------------------------</p>
                        </div>
        
                        <h5>Total: {total} RON </h5>
                        <p className="mb-2 custom-p-small"> *Calculated as the total payment for all your utilities</p>
                        <p>----------------------------------------------------------------------------------------</p>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-danger me-2 btn-lg" onClick={handlerPayment}>Report</button>
                            <button type="submit" className="btn btn-success  btn-lg" onClick={handlerReport}>Pay now</button>
                        </div> 
                        
                    </div>
                </div>
                <div class="card-footer text-body-secondary">
                    Emitted on: some date
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