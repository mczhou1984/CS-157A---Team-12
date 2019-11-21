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
  const [isPopulated, setIsPopulated] = useState(false)
  let dates = {};
//  const [userData, setUserData] = useState()

  function groupDataByDate (data, date){
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
    setTransactionData(dates);
  setDateArr(temp);
  }

  function formatDate(dateStr){
    let date = new Date(dateStr);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex]+ ' ' + day + ', ' + year;
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
      setIsPopulated(res.data.transactions.length > 0)
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
            <th colspan="2" scope="col">{formatDate(date)}</th>
          </tr>
          </thead>
          <tbody>
            <tr class="table-primary">
              <td class="left-col" scope="row">Daily Budget</td>
              <td>+$$$</td>
            </tr>
          {renderTransactions(date)}

          <tr class="last-row">
          <td></td><td>TOTAL</td></tr>
          </tbody>
        </table>
      )

    })
  }

  const renderTransactions = (date)=> {
    return transactionData[date].map(transactions => {
      return (
        <tr>
          <td class="left-col" scope="row">{transactions.type}</td>
          <td>{transactions.amount > 0 ? '+$' + transactions.amount.toFixed(2) : '-$' + -transactions.amount.toFixed(2)}</td>
        </tr>
      )
    })

  }

  const renderError = (date) => {
    return (<StyledTransactions><div>
            <h2>NO TRANSACTION HISTORY</h2></div>

    </StyledTransactions>)
  }


  return (<StyledTransactions>
    <div class="container">
    <div class="table-card">
    {isPopulated ? renderDates(): renderError()}
    </div>

    </div>
  </StyledTransactions>);
}

export default Transactions;
