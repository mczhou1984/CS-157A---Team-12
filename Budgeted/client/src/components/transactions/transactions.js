import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {StyledTransactions} from './transactions.styled.js'
import {Chart, Bar} from 'react-chartjs-2'
import CurrencyInput from 'react-currency-input'
//

function Transactions() {
  //localStorage.clear();
  const [transactionData, setTransactionData] = useState()

  useEffect(() => {

  //  Authenticate user and get user Data
    const tmp = JSON.parse(localStorage.getItem('userData'));
    const url = '/user/transactions';
    axios.defaults.headers.common['Authorization'] = tmp.token;
    axios.get(url).then(res => {
      setTransactionData()
    })

    //TODO:: axios calls to get graph Data


  }, [])


  return (<StyledTransactions>
    <div class="container">

      <h2>Hello,</h2>
      <h2>Your Budget: $</h2>

    </div>
  </StyledTransactions>);
}

export default Transactions;
