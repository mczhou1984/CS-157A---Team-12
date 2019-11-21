import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {StyledBudget} from './budget.styled.js'
import CurrencyInput from 'react-currency-input'
//
function hideModal() {

  document.querySelector('.income-modal').style.display = "none"
   document.querySelector('.expense-modal').style.display = "none"
   document.querySelector('.savings-modal').style.display = "none"
}
function showIncomeModal() {

  document.querySelector('.income-modal').style.display = "flex"

}
function showExpenseModal() {

  document.querySelector('.income-modal').style.display = "flex"

}
function showSavingsModal() {

  document.querySelector('.income-modal').style.display = "flex"

}
function handlePositiveTransaction(event){
      event.preventDefault();
  const tmp = JSON.parse(localStorage.getItem('userData'))
  const url = '/user/transaction';
  const dropdown = document.getElementById("category2")
  const transaction = {
    amount:+document.getElementById("posInput").value.substring(2).replace(",",""),
    category:dropdown.options[dropdown.selectedIndex].value
  }

  console.log(transaction)
  axios.defaults.headers.common['Authorization'] = tmp.token
  axios.post(url, transaction).then(res => {
    console.log(res)
  })

  hideModal()
}
function handleNegativeTransaction(event){
      event.preventDefault();
  const tmp = JSON.parse(localStorage.getItem('userData'))
  const url = '/user/transaction'
  const dropdown = document.getElementById("category1")
  const transaction = {
    amount:-document.getElementById("negInput").value.substring(2).replace(",",""),
    category:dropdown.options[dropdown.selectedIndex].value
  }
  console.log(transaction)

  axios.defaults.headers.common['Authorization'] = tmp.token
  axios.post(url, transaction).then(res => {
    console.log(res)
  })

  hideModal()
}
function BudgetModal(){
  return (
    <StyledBudget>
    <div>

    <div className="income-modal">
      <div className="modal-contents">

        <div className="close" onClick={hideModal}>+</div>

        <form onSubmit={handlePositiveTransaction}>
        <h3>$$$ /day</h3>
          <input className="form-control mr-sm-2" type="text" placeholder="Type"/>
          <CurrencyInput allowEmpty={false} id="posInput" className="form-control mr-sm-2" prefix="$" value="0.00"/>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

      </div>
    </div>
    <div className="expense-modal">
      <div className="modal-contents">

        <div className="close" onClick={hideModal}>+</div>

        <form onSubmit={handlePositiveTransaction}>
        <h3>$$$ /day</h3>
          <input className="form-control mr-sm-2" type="text" placeholder="Type"/>
          <CurrencyInput allowEmpty={false} id="posInput" className="form-control mr-sm-2" prefix="$" value="0.00"/>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

      </div>
    </div>
    <div className="savings-modal">
      <div className="modal-contents">

        <div className="close" onClick={hideModal}>+</div>

        <form onSubmit={handlePositiveTransaction}>
        <h3>$$$ /day</h3>
          <input className="form-control mr-sm-2" type="text" placeholder="Type"/>
          <CurrencyInput allowEmpty={false} id="posInput" className="form-control mr-sm-2" prefix="$" value="0.00"/>
          <button type="submit" className="btn btn-primary">Add</button>
        </form>

      </div>
    </div>
    </div>
</StyledBudget>

  )

}
function Budget() {
  //localStorage.clear();

  useEffect(() => {

  //TODO: Authenticate user and budget data
    // const tmp = JSON.parse(localStorage.getItem('userData'));
    // const url = '/user/dashboard';
    // axios.defaults.headers.common['Authorization'] = tmp.token;
    // axios.get(url).then(res => {
    //   setUserData(res.data.user[0])
    // })

    //TODO:: axios calls to get graph Data

  }, [])




  return (<StyledBudget>
    <div className="container">

    <div class="card  mb-3">
      <div class="card-header bg-success">
      <h1>$56.21</h1>
      <h4>/day</h4>
      </div>
      <div class="card-body">
      <div className="btnDiv">
        <button type="submit" id="btn1" className="btn-success" onClick={showIncomeModal}>
          Regular Income
        </button>
        <div className="divider"/>
        <button type="submit" id="btn2" className="btn-warning" onClick={showExpenseModal}>
          Recurring Expenses
        </button>
        <div className="divider"/>
        <button type="submit" id="btn2" className="btn-primary" onClick={showSavingsModal}>
          Savings
        </button>
      </div>
      </div>
    </div>




    </div>
    </StyledBudget>);
}

export  {Budget, BudgetModal};
