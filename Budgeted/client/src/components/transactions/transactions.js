import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {StyledTransactions} from './transactions.styled.js'
import _ from 'lodash'
//

function Transactions() {
  //localStorage.clear();
  const [transactionData, setTransactionData] = useState()
//  const [userData, setUserData] = useState()

  function groupDataByDate (data, date){
  //   return data.reduce(function(rv, x) {
  //   (rv[x[date]] = rv[x[date]] || []).push(x);
  //   return rv;
  // }, {});

  let grouped = _.mapValues(_.groupBy(data, 'date'),
                          clist => clist.map(data => _.omit(data, 'date')));
  return grouped

  // let  result = data.reduce(function (r, a) {
  //       r[a.date] = r[a.date] || [];
  //       r[a.date].push(a);
  //       return r;
  //   }, Object.create(null));


  }



  useEffect(() => {

  //  Authenticate user and get user Data
    const tmp = JSON.parse(localStorage.getItem('userData'));
    const url = '/user/transactions';
    axios.defaults.headers.common['Authorization'] = tmp.token;
    axios.get(url).then(res => {
      //console.log(res.data.transactions)
      //console.log(groupDataByDate(res.data.transactions, 'date'))
      setTransactionData(groupDataByDate(res.data.transactions, 'date'))
    },[])

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
