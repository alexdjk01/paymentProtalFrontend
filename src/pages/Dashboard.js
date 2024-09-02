import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Authentification'
import axios from 'axios';
import '../css/styles.css'
import InvoiceCard from '../layouts/InvoiceCard';

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
       <h1>Welcome, {userAuth.fullName} || ROLE: REGULAR USER</h1>

       <div className="d-flex justify-content-center mb-5">
                <button type="submit" className="btn btn-primary btn-lg me-2" onClick={handlerHistoryInvoices}>Past Invoices</button>
                <button type="submit" className="btn btn-primary btn-lg" onClick={handlerCurrentInvoice}>Current Invoice</button>
        </div>

        {showCurrent && (
         
          <div>
            {currentInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}

        {showHistory && (
         <div>
            {historyInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        )}
    </div>
  )
}
