import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Authentification'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function DashboardAdmin() {

    const {userAuth} = useAuth();
    const navigate = useNavigate();
    const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
    const [showAdjustPrices, setShowAdjustPrices] = useState(false);
    const [showControlPanel, setShowControlPanel] = useState(true);
    const [showNumberOfApartments , setShowNumberOfApartments] = useState("");

    const [invoice,setInvoice] = useState({
        waterConsumption:"",
        gasConsumption:"",
        energyConsumption:"",
        startBillingPeriod:"",
        endBillingPeriod:""
    });

    const [streets, setStreets] = useState([]);
    const [flats, setFlats] = useState([]);
    const [apartments, setApartments] = useState([]);
    const [streetSelected, setStreetSelected] = useState("");
    const [flatSelected, setFlatSelected] = useState("");
    const [apartmentSelected, setApartmentSelected] = useState(0);
    const [errors, setErrors] = useState({});

    const{waterConsumption,gasConsumption , energyConsumption,startBillingPeriod,endBillingPeriod}=invoice;

    const [utilityPrices, setUtilityPrices] = useState({
        waterPriceAdjust: "",
        gasPriceAdjust: "",
        electricityPriceAdjust: ""
    });

    const{waterPriceAdjust,gasPriceAdjust , electricityPriceAdjust}=utilityPrices;

    useEffect(() => {
        console.log("Streets: ", streets);
        console.log("Flats: ", flats);
        console.log("Apartments: ", apartments);
    },[streets],[flats],[apartments]);

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


        fetchUtilityPrices();
       
    }, []);

    useEffect( () => {
        const fetchAdminZone =  () => {
            if (userAuth && userAuth.streets && userAuth.flats) {
            const streetsArray = userAuth.streets.split(',').map(street => street.trim());
            setStreets(streetsArray);
            const flatsArray = userAuth.flats.split(',').map(flats =>flats.trim());
            const parsedFlats =[];
            const parsedApartments=[];
            flatsArray.forEach(element => {
                const [flatNumber, maxApartments] = element.split('-');
                parsedFlats.push(flatNumber);
                parsedApartments.push(maxApartments);
            });
            setFlats(parsedFlats);
            setApartments(parsedApartments);
            }
        }
        fetchAdminZone();
    },[])

    //if user does not exists, give this message, else render using the last return statement.
    if(!userAuth)
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

    const onInputChangeStreets = (e) => {
        setStreetSelected( e.target.value );
    };

    const onInputChangeFlats = (e) => {
        setFlatSelected( e.target.value );
        const flatInTarget = e.target.value;
        const flatInTargedIndex = flats.indexOf(flatInTarget);
        console.log("Index of flat: " , flatInTargedIndex);
        setShowNumberOfApartments(apartments[flatInTargedIndex]);
    };

    const onInputChangeApartments = (e) => {
        setApartmentSelected( e.target.value );
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

    function formateDate(dateString)
    {
        const [year,month,day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    const validateForm = () =>{
        let fieldsErrors = {};
        if(!waterConsumption)
        {
            fieldsErrors.waterConsumption = "Field required!";
        }
        if(!energyConsumption)
        {
            fieldsErrors.energyConsumption = "Field required!";
        }
        if(!gasConsumption)
        {
            fieldsErrors.gasConsumption = "Field required!";
        }
        if(!startBillingPeriod && startBillingPeriod !=="mm/dd/yyyy")
        {
            fieldsErrors.startBillingPeriod="Field required";
        }
        if(!endBillingPeriod && endBillingPeriod !=="mm/dd/yyyy")
        {
            fieldsErrors.endBillingPeriod="Field required";
        }
        if(!streetSelected.trim())
        {
            fieldsErrors.streetSelected="Field required";
        }
        if(!flatSelected.trim())
        {
            fieldsErrors.flatSelected="Field required";
        }
        if(!apartmentSelected)
        {
            flatSelected.apartmentSelected="Field required";
        }
        setErrors(fieldsErrors);
        return Object.keys(fieldsErrors).length ===0;
    }

    const handlerGenerateInvoiceClick = async(e) =>{
        e.preventDefault();
        const formValidated = validateForm();
        if(formValidated)
        {
            const formattedStartBillingPeriod = formateDate(invoice.startBillingPeriod);
            const formattedEndBillingPeriod = formateDate(invoice.endBillingPeriod);
            const billingPeriod = `${formattedStartBillingPeriod} - ${formattedEndBillingPeriod}`;
                console.log(billingPeriod);
            const fullAddress = `Loc: ${userAuth.city}, Str: ${streetSelected}, Flat: ${flatSelected}, Ap: ${apartmentSelected}`;
            let user = "";
            try{
                const userMatched = await axios.get(`http://localhost:8080/users/address/${fullAddress}`);
                user = userMatched.data;
            }catch(err)
            {
                console.error("User cannot be found: ", err);
            }
            // console.log(client.data);
            const titleInvoice = `General Invoice : ${billingPeriod}`;
            const waterPrice = waterPriceAdjust;
            const gasPrice = gasPriceAdjust;
            const energyPrice = electricityPriceAdjust;
            const paid = false;
            const reported=false;
    
            const finalInvoice = {
                waterConsumption,
                gasConsumption,
                energyConsumption,
                waterPrice,
                gasPrice,
                energyPrice,
                billingPeriod,
                titleInvoice,
                paid,
                reported,
                user
            }

            console.log(finalInvoice);
            console.log(user);
            
            try{
                const invoiceSent = await axios.post("http://localhost:8080/invoices", finalInvoice);
                console.log("Invoice sent: ", invoiceSent);
            }
            catch(err)
            {
                console.error("Invoice can't be saved! ", err);
            }
            
            alert("Invoice was generated!");
        }
    }

  return (
    <div>
        {showControlPanel &&(
            <div>
                <div className='custom-container-admin-credentials'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='text-start '>
                                <p>Welcome, {userAuth.fullName} your role is: ADMIN</p>
                            </div>
                        </div>
                    
                    
                        <div className='col-md-8'>
                            <div className='text-start custom-container-admin-credentials-address '>
                                <p>Access zone: Loc: {userAuth.city} || Streets: {userAuth.streets} || Flats-No. Apartments: {userAuth.flats}  </p>
                            </div>
                        </div>
                    </div>
                </div>
       

                <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg me-2" onClick={handlerAdjsutPricesClick}>Adjust Prices</button>
                        <button type="submit" className="btn btn-primary btn-lg" onClick={handlerGenerateInvoicesClick}>Generate Invoices</button>
                </div>
            </div>

            
        )}
        

        {showInvoiceGenerator && (
        <section className="custom-container">
                <div className="container py-5 custom-container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card card-registration ">
                                <div className="card-body p-md-4 text-black custom-card-form">
                                    <h3 className="mb-4 text-uppercase text-center">Invoice Generator</h3>
                                    <div className="mb-3">
                                    <div className='row justify-content-center'>
                                        <div className="col-md-10 mb-3">
                                            <label className="form-label h6" for="streets">Street</label>
                                            <select className="form-select" id="streetInput" name="streets" value={streetSelected} onChange={onInputChangeStreets}>
                                                <option value="">Select Street</option>
                                                {streets.map((street,index) =>(
                                                    <option key={index} value={street}>
                                                        {street}
                                                    </option>
                                                ))}

                                            </select>
                                            {errors.streetSelected && <small className='text-danger'>{errors.streetSelected}</small>}
                                        </div>

                                        <div className="col-md-5">
                                            <label className="form-label h6" for="flats">Flat</label>
                                            <select className="form-select" id="flatInput" name="flats" value={flatSelected} onChange={onInputChangeFlats}>
                                                <option value="">Select Flat</option>
                                                {flats.map((flat,index)  =>(
                                                    <option key={index} value={flat}>
                                                        {flat}
                                                    </option>
                                                ))}

                                            </select>
                                            {errors.flatSelected && <small className='text-danger'>{errors.flatSelected}</small>}
                                        </div>

                                        <div className="col-md-5 ">
                                            <div className="form-outline">
                                                <label className="form-label h6" htmlFor="apartments" >Apartment</label>
                                                <input type="number" id="apartmentsInput" className="form-control form-control-md"  name="apartments" value={apartmentSelected} onChange={onInputChangeApartments} min="0" />
                                                {errors.apartmentSelected && <small className='text-danger'>{errors.apartmentSelected}</small>}
                                            </div>
                                        </div>

                                        {showNumberOfApartments && (
                                        <p className='mt-2'>Flat {flatSelected} has a total number of {showNumberOfApartments} apartments</p>
                                        )}
                                    

                                    </div>

                                        <div className="form-outline px-5">
                                                <label className="form-label h6" htmlFor="waterConsumption">Water Consumption</label>
                                                <input type="number" id="waterConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="waterConsumption" value={waterConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                                <small className="text-body-secondary">Current pricing: {utilityPrices.waterPriceAdjust} RON/m3</small>
                                                {errors.waterConsumption && <small className='text-danger'>{errors.waterConsumption}</small>}
                                        </div>
                                    </div>

                                    

                                    <div className=" mb-3">
                                        <div className="form-outline px-5 ">
                                                <label className="form-label h6" htmlFor="energyConsumption">Energy Consumption</label>
                                                <input type="number" id="energyConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="energyConsumption" value={energyConsumption} onChange={onInputChangeInvoice}  min="0"/>                                       
                                                <small className="text-body-secondary">Current pricing: {utilityPrices.electricityPriceAdjust} RON/kWh</small>
                                                {errors.energyConsumption && <small className='text-danger'>{errors.energyConsumption}</small>}
                                        </div>
                                    </div>

                                    <div className=" mb-4">
                                        <div className="form-outline px-5">
                                            <label className="form-label h6" htmlFor="gasConsumption" >Gas Consumption</label>
                                            <input type="number" id="gasConsumptionInput" className="form-control form-control-md" placeholder="Amount" name="gasConsumption" value={gasConsumption} onChange={onInputChangeInvoice}  min="0"/>
                                            <small className="text-body-secondary">Current pricing: {utilityPrices.gasPriceAdjust} RON/m3</small>
                                            {errors.gasConsumption && <small className='text-danger'>{errors.gasConsumption}</small>}
                                        </div>
                                    </div>

                                    <div className="row justify-content-center mb-4">
                                        <div className="col-md-5 ">
                                                <div className="form-outline">
                                                <label className="form-label h6" htmlFor="startBillingPeriod" >Start Billing Period</label>
                                                <input type="date" id="startBillingPeriodInput" className="form-control form-control-md"  name="startBillingPeriod" value={startBillingPeriod} onChange={onInputChangeInvoice} />
                                                {errors.startBillingPeriod && <small className='text-danger'>{errors.startBillingPeriod}</small>}
                                            </div>
                                        </div>

                                        <div className="col-md-5 ">
                                            <div className="form-outline">
                                                <label className="form-label h6" htmlFor="endBillingPeriod" >End Billing Period</label>
                                                <input type="date" id="endBillingPeriodInput" className="form-control form-control-md"  name="endBillingPeriod" value={endBillingPeriod} onChange={onInputChangeInvoice} />
                                                {errors.endBillingPeriod && <small className='text-danger'>{errors.endBillingPeriod}</small>}
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
            <section className="custom-container ">
            <div className="container py-5 custom-container">
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="card card-registration ">
                            <div className="card-body p-md-4 text-black custom-card-form">
                                <h3 className="mb-4 text-uppercase text-center">Price Adjuster</h3>
                                        <div className=" mb-2">
                                            <div className="form-outline px-5">
                                                    <label className="form-label h6" htmlFor="waterConsumption">Water Price</label>
                                                    <input type="number" id="waterPriceInput" className="form-control form-control-md" placeholder="Amount" name="waterPriceAdjust" value={utilityPrices.waterPriceAdjust|| 0} onChange={onInputChangeUtility} min="0"/>
                                                
                                            </div>
                                        </div>

                                        <div className=" mb-2">
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
