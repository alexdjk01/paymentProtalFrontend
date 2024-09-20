import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Authentification'
import axios from 'axios';
import '../css/styles.css'
import InvoiceCard from '../layouts/InvoiceCard';
import myImage from '../images/dashboardPhotoo.jpg'

//2 butoane 1. current invoice 2. history invoices -> in functie de timp ( billing period)

export default function Dashboard() {

  const {userAuth} = useAuth();

  const [invoices , setInvoices] = useState([]);
  const [loggedUserId , setLoggedUserId] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [currentInvoices , setCurrentInvoices] = useState([]);
  const [historyInvoices , setHistoryInvoices] = useState([]);



  useEffect(() => {
    if (userAuth && userAuth.id) {
      setLoggedUserId(userAuth.id);
    }
  }, [userAuth]);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (loggedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/invoices/user/${loggedUserId}`);
          setInvoices(response.data);
        } catch (err) {
          console.error("Unable to fetch invoices for user: ", err);
        }
      }
    };

    fetchInvoices();
  }, [loggedUserId]);

  useEffect(() => {
    separateInvoices(invoices);
  }, [invoices]);

  function isInvoiceCurrent(invoiceDateString)
  {
    const [day,month,year] = invoiceDateString.split('/').map(Number);
    const invoiceDate = new Date(year, month-1, day);
    const currentDate = new Date();
    const oneMonthAgoDate = new Date();
    oneMonthAgoDate.setMonth(currentDate.getMonth()-1);
    return invoiceDate >= oneMonthAgoDate;
  }

  function separateInvoices(invoices)
  {
    let current = [];
    let history = [];

    invoices.forEach(invoice => {
      const { billingPeriod } = invoice;
      const invoiceDateStr = billingPeriod.split(' - ')[0];
      if(isInvoiceCurrent(invoiceDateStr))
      {
        current.push(invoice);
      }
      else
      {
        history.push(invoice);
      }
    });

  setCurrentInvoices(current);
  setHistoryInvoices(history);

  }

  const handlerHistoryInvoices = () =>{
    setShowCurrent(false);
    setShowHistory(true);
    console.log(currentInvoices);
    console.log(historyInvoices);

  }
  
  const handlerCurrentInvoice = () => {
    setShowHistory(false);
    setShowCurrent(true);
  
  }

  if(!userAuth)
  {
    return <p>Please log in to access this page.</p>
  }
 
  return (
    <div>
      <div className='custom-container-background'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='custom-dashboard-container'>
              <h4 >Glad to have you back, {userAuth.fullName} !</h4>
              <p>Here you can find all your invoices and you are provided with various methods of payment. </p>
              <p>Inspect your monthly bill, browse through your old invoices if you need past informations, report an issue or select your favourite method of payment all in one single platform.</p>
              
             


              <div className='justify-content-start mx-5 my-3'>

                <button type="submit" className="btn custom-btn-invoices" onClick={handlerHistoryInvoices}>Past Invoices</button>
                <button type="submit" className="btn custom-btn-invoices mx-4" onClick={handlerCurrentInvoice}>Current Invoice</button>
              </div>
              <p>Get 5% cashback for your utility bills if you pay on time! </p>
              <p className='mt-5'>Download the mobile application: </p>

              <a href="https://www.kobinet.com.tr/" target="_blank" class="market-btn apple-btn" role="button">
                <span class="market-button-subtitle">Download on the</span>
                <span class="market-button-title">App Store</span>
              </a>

              <a href="https://www.kobinet.com.tr/" target="_blank" class="market-btn google-btn mx-3" role="button">
                <span class="market-button-subtitle">Download on the</span>
                <span class="market-button-title">Google Play</span>
              </a>

            
             
            </div>
          </div>
          <div className='col-md-6'>
            <img src={myImage} alt='Register Image' className='img-fluid' />
            
          </div>
        </div>
        

        

          {showCurrent && (
          
            <div>
              {currentInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          )}

          {showHistory && (
          <div className="d-flex flex-wrap ">
          {historyInvoices.map((invoice, index) => (
            <div
              className="invoice-card-container"
              key={invoice.id}
              style={{ flex: '0 0 50%', maxWidth: '50%' }}
            >
              <InvoiceCard invoice={invoice} />
            </div>
          ))}
        </div>
          )}
      </div>
      <p className='mt-5 custom-small-text'>Services may be provided by Payment Portal Financial Services or Portal Financial International Services, LLCST MMTSLS# 99999, which are licensed as Money Transmitters by the New York State Department of Financial Services.  See terms and conditions for details.</p>
      <p className=' custom-small-text'>© 2024 Payment Portal Holdings, Inc. All Rights Reserved</p>
    </div>
  )
}
