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
  const [totalArr, setTotalArr] = useState([])
  let dates = {};
//  const [userData, setUserData] = useState()

  function groupDataByDate (data, date){
  let dates = _.mapValues(_.groupBy(data, date),
                          clist => clist.map(data => _.omit(data, date)))

  let temp = [];
  let total = 0;
  let n = 1;
  let budget = 0;
  console.log("`````````````DATES``````````")
  console.log(dates)
  for (let date in dates){

    for(let i = 0; i < dates[date].length; i++){

      budget = dates[date][i].daily_budget-dates[date][i].daily_budget*dates[date][i].savingPercentage
      total += dates[date][i].amount
    }
    total += budget
    temp.push({
      date:date,
      total:total,
      budget:budget
    }
    )
  }
    // console.log(temp)
    // setTransactionData(dates.filter(function(date){
    //   return date.amount > 0;
    // }))
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
      groupDataByDate(res.data.transactions, 'trans_date')
      setIsPopulated(res.data.transactions.length > 0)
      console.log(res.data);
    },[])

    //TODO:: axios calls to get graph Data



  }, [])
  const renderDates = () => {
    return dateArr.map(date=>{
      return (
        <table className="table table-hover" key={date.date}>
          <thead>
          <tr className="table-active">
            <th colSpan="2" scope="col">{formatDate(date.date)}</th>
          </tr>
          </thead>
          <tbody>
            <tr className="table-primary">
              <td className="left-col" scope="row">Daily Budget</td>
              <td>+${date.budget.toFixed(2)}</td>
            </tr>
          {renderTransactions(date)}

          <tr className="last-row">
          <td>TOTAL</td><td> ${date.total.toFixed(2)}</td></tr>
          </tbody>
        </table>
      )

    })
  }

  const renderTransactions = (date)=> {
    return transactionData[date.date].map(transactions => {
      return (
        <tr  key = {transactions.transactionID}>
          <td className="left-col" scope="row">{transactions.type}</td>
          <td>{transactions.amount > 0 ? '+$' + transactions.amount.toFixed(2) : '-$' + (-transactions.amount).toFixed(2)}</td>
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
    <div className="container">
    <div className="table-card">
    {isPopulated ? renderDates(): renderError()}
    </div>

    </div>
  </StyledTransactions>);
}

export default Transactions;
