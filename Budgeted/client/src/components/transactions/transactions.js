import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {StyledTransactions} from './transactions.styled.js'
import _ from 'lodash'
//

function Transactions() {
  //localStorage.clear();
  const [transactionData, setTransactionData] = useState('')
  const [dateArr, setDateArr] = useState([])
  const [dummyState, setDummyState] = useState([])
  let dates = {};
//  const [userData, setUserData] = useState()

  function groupDataByDate (data, date){
  //   return data.reduce(function(rv, x) {
  //   (rv[x[date]] = rv[x[date]] || []).push(x);
  //   return rv;
  // }, {});

  let dates = _.mapValues(_.groupBy(data, 'date'),
                          clist => clist.map(data => _.omit(data, 'date')))
  let temp = [];
  let n = 1;
  for (let date in dates){

    temp.push(
      date
    )
    n=n+1

  }
  console.log(dates);
    setTransactionData(dates);
  setDateArr(temp);





  //console.log(dateArr[1].date[1]);

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
      //console.log(groupDataByDate(res.data.transactions, 'date'))
      //setTransactionData(groupDataByDate(res.data.transactions, 'date'))
      groupDataByDate(res.data.transactions, 'date')
      console.log(dates);
    },[])

    //TODO:: axios calls to get graph Data



  }, [])
  const renderDates = () => {
    return dateArr.map(date=>{
      return (
        <table class="table table-hover">
          <thead>
          <tr class="table-active">
            <th colspan="2" scope="col">{date}</th>
          </tr>
          </thead>
          <tbody>
          {renderTransactions(date)}
          </tbody>
        </table>
      )

    })
  }

  const renderTransactions = (date)=> {
    return transactionData[date].map(transactions => {
      return (
        <tr>
          <th scope="row">{transactions.type}</th>
          <td>{transactions.amount}</td>
        </tr>
      )
    })

  }


  return (<StyledTransactions>
    <div class="container">
    <div class="table-card">
    {renderDates()}
    </div>

    </div>
  </StyledTransactions>);
}

export default Transactions;
