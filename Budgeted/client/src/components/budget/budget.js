import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {StyledBudget} from "./budget.styled.js";
import CurrencyInput from "react-currency-input";
import BudgetContext from "../../context/budget-context"
//
function showIncomeModal() {
  document.querySelector(".income-modal").style.display = "flex";
}
function showExpenseModal() {
  document.querySelector(".expense-modal").style.display = "flex";
}
function showSavingsModal() {
  document.querySelector(".savings-modal").style.display = "flex";
}
function handleIncomeChange(event) {}

function BudgetModal() {
  const [savings, setSavings] = useState(localStorage.getItem("savings")*100);
  const [savingsPerDay, setSavingsPerDay] = useState(
    (
      0 +
      (localStorage.getItem("budget") * localStorage.getItem("savings"))
    ).toFixed(2)
  );
  const [income, setIncome] = useState("$0");
  const [incomePerDay, setIncomePerDay] = useState(0);
  const [expense, setExpense] = useState("$0");
  const [expensePerDay, setExpensePerDay] = useState(0);
  const [incomeArr, setIncomeArr] = useState([])
    const [expenseArr, setExpenseArr] = useState([])

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem("userData"));
    let url = "/user/budget/income";
    if(tmp != null){
      axios.defaults.headers.common["Authorization"] = tmp.token;
      axios.get(url).then(res => {
//        console.log(res.data.income);
        setIncomeArr(res.data.income.filter(function(income){
          return income.amount > 0;
        }))
      })

      url = "/user/budget/expense";
      axios.get(url).then(res => {
//        console.log(res.data.expense);
        setExpenseArr(res.data.expense.filter(function(expense){
          return expense.amount > 0;
        }))
      })

    }

  }, [])
  function handleAddIncome(event) {
    event.preventDefault();
    const tmp = JSON.parse(localStorage.getItem("userData"));
    const url = "/user/budget/income";

    const income = {
      amount: document
        .getElementById("incomeInput")
        .value.substring(1)
        .replace(",", ""),
      type: document.getElementById("incomeType").value
    };

    console.log(income);
    axios.defaults.headers.common["Authorization"] = tmp.token;
    axios.post(url, income).then(res => {
      console.log(res);
    });

    hideModal();
  //  window.location.reload();
  }
  function handleAddExpense(event) {
    event.preventDefault();
    const tmp = JSON.parse(localStorage.getItem("userData"));
    const url = "/user/budget/expense";

    const expense = {
      amount: document
        .getElementById("expenseInput")
        .value.substring(1)
        .replace(",", ""),
      type: document.getElementById("expenseType").value
    };

    console.log(expense);
    axios.defaults.headers.common["Authorization"] = tmp.token;
    axios.post(url, expense).then(res => {
      console.log(res);
    });

    hideModal();
  //  window.location.reload();
  }
  function handleAddSaving(event) {
    event.preventDefault();
    localStorage.setItem("savings", document.getElementById("savingsInput").value/100)
    const tmp = JSON.parse(localStorage.getItem("userData"));
    const url = "/user/budget/savings";

    const expense = {
      percent: document.getElementById("savingsInput").value / 100
    };

    console.log(expense);
    axios.defaults.headers.common["Authorization"] = tmp.token;
    axios.post(url, expense).then(res => {
      console.log(res);
    });

    hideModal();
//    window.location.reload();
  }
  function hideModal() {
    document.querySelector(".income-modal").style.display = "none";
    document.querySelector(".expense-modal").style.display = "none";
    document.querySelector(".savings-modal").style.display = "none";
    setIncome("$0");
    setIncomePerDay(0);
    setExpense("$0");
    setExpensePerDay(0);
    // setSavingsPerDay((localStorage.getItem("budget") -
        //   (localStorage.getItem("budget") * localStorage.getItem("savings")) / 100
        // ).toFixed(2));
    // setSavings(localStorage.getItem("savings")*100)
    localStorage.setItem("budget", (localStorage.getItem("budget")-(localStorage.getItem("budget") * localStorage.getItem("savings")) / 100
            ).toFixed(2))
   window.location.reload();
  }
  function handleSliderChange(event) {
    setSavings(event.target.value);
    setSavingsPerDay(
      (
        0 +
        (localStorage.getItem("budget") * event.target.value) / 100
      ).toFixed(2)
    );
  }
  function handleIncomeChange(event) {
    setIncome(event.target.value);
    setIncomePerDay(
      (event.target.value.substring(1).replace(",", "") / 30).toFixed(2)
    );
  }
  function handleExpenseChange(event) {
    setExpense(event.target.value);
    setExpensePerDay(
      (event.target.value.substring(1).replace(",", "") / 30).toFixed(2)
    );
  }
  function handleDeleteIncome(incomeID, amount){
    //event.preventDefault();

    const tmp = JSON.parse(localStorage.getItem("userData"));
    const url = "/user/budget/deleteincome";
    axios.defaults.headers.common["Authorization"] = tmp.token;
    console.log(amount);
    let req = {
      incomeID:incomeID,
      amount:amount
    }
    axios.post(url, req).then(res => {
      console.log(res.data.income);
      setIncomeArr(res.data.income.filter(function(income){
        return income.amount > 0;
      }))
    })
  }
  function handleDeleteExpense(expenseID, amount){
    //event.preventDefault();

    const tmp = JSON.parse(localStorage.getItem("userData"));
    const url = "/user/budget/deleteexpense";
    axios.defaults.headers.common["Authorization"] = tmp.token;
    let req = {
      expenseID:expenseID,
      amount:amount
    }
    axios.post(url, req).then(res => {
      console.log(res.data.expense);
      setExpenseArr(res.data.expense.filter(function(expense){
        return expense.amount > 0;
      }))
    })
  }


  const renderIncomes = () => {
    return incomeArr.map(income => {
      return (
        <div id="income-card" className="card text-white bg-success mb-3"  key={income.incomeID}>
        <div className="close2" onClick={()=> handleDeleteIncome(income.incomeID,income.amount)}>
          +
        </div>
  <div className="card-header">{income.type}</div>
  <div className="card-body">
    <h4 className="card-title">${(income.amount/30).toFixed(2)} /day</h4>
    <p className="card-text">${(income.amount).toFixed(2)} /month</p>
  </div>
</div>
      )
    })
  }
  const renderExpenses = () => {
    return expenseArr.map(expense => {
      return (
        <div id="income-card" className="card text-white bg-warning mb-3"  key={expense.expenseID}>
        <div className="close2" onClick={()=> handleDeleteExpense(expense.expenseID,expense.amount)}>
          +
        </div>
  <div className="card-header">{expense.type}</div>
  <div className="card-body">
    <h4 className="card-title">${(expense.amount/30).toFixed(2)} /day</h4>
    <p className="card-text">${(expense.amount).toFixed(2)} /month</p>
  </div>
</div>
      )
    })
  }
  return (
    <StyledBudget>
      <div>
        <div className="income-modal">
          <div className="modal-contents">
            <div className="close" onClick={hideModal}>
              +
            </div>

            <form onSubmit={handleAddIncome}>
              <h2>{income} /month</h2>
              <h3>${incomePerDay} /day</h3>
              <CurrencyInput
                allowEmpty={false}
                id="incomeInput"
                className="form-control mr-sm-2"
                prefix="$"
                value={income}
                onChangeEvent={handleIncomeChange}
              />
              <input
                id="incomeType"
                className="form-control mr-sm-2"
                type="text"
                placeholder="Type"
              />

              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
{renderIncomes()}
          </div>
        </div>
        <div className="expense-modal">
          <div className="modal-contents">
            <div className="close" onClick={hideModal}>
              +
            </div>
            <form onSubmit={handleAddExpense}>
              <h2>{expense} /month</h2>
              <h3>${expensePerDay} /day</h3>
              <CurrencyInput
                allowEmpty={false}
                id="expenseInput"
                className="form-control mr-sm-2"
                prefix="$"
                value={expense}
                onChangeEvent={handleExpenseChange}
              />
              <input
                id="expenseType"
                className="form-control mr-sm-2"
                type="text"
                placeholder="Type"
              />

              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
            {renderExpenses()}
          </div>
        </div>
        <div className="savings-modal">
          <div className="savings-modal-contents">
            <div className="close" onClick={hideModal}>
              +
            </div>

            <form onSubmit={handleAddSaving}>
              <h2>{savings}%</h2>
              <h3>${savingsPerDay} /day</h3>
              <div className="slidecontainer">
                <input
                  id="savingsInput"
                  type="range"
                  min="1"
                  max="100"
                  value={savings}
                  onChange={handleSliderChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </StyledBudget>
  );
}
function Budget() {
  //localStorage.clear();
  const [budget, setBudget] = useState(0);
  const [income, setTotalIncome] = useState(0);
  const [expenses, setTotalExpenses] = useState(0);
  const [savingsPerDay, setSavingsPerDay] = useState(0);
  const context = useContext(BudgetContext);

  useEffect(() => {
    console.log(context)
    const tmp = JSON.parse(localStorage.getItem("userData"));
    const url = "/user/budget";
    axios.defaults.headers.common["Authorization"] = tmp.token;
    axios.get(url).then(res => {
      console.log(res.data);
      setBudget(
        (
          res.data.budget.daily_budget -
          res.data.budget.daily_budget * res.data.budget.savingPercentage
        ).toFixed(2)
      )
      setTotalIncome(((res.data.budget.total_income)/30).toFixed(2))
      setTotalExpenses((res.data.budget.total_expenses/30).toFixed(2))
      setSavingsPerDay((res.data.budget.daily_budget * res.data.budget.savingPercentage).toFixed(2))
      localStorage.setItem("budget", res.data.budget.daily_budget)
      localStorage.setItem("savings", res.data.budget.savingPercentage)
    })
    //TODO:: axios calls to get graph Data
  }, [])

  return (
    <StyledBudget>
      <div className="container">
        <div className="card  mb-3">
          <div className="card-header bg-success">
            <h1>${budget}</h1>
            <h4>/day</h4>
          </div>
          <div className="card-body">
            <div className="btnDiv">
              <button
                type="submit"
                id="btn1"
                className="btn-success"
                onClick={showIncomeModal}
              >
                Regular Income
              </button>              <hr/>
               <h3 className="income-text">${income}</h3>
              <div className="divider" />
              <button
                type="submit"
                id="btn2"
                className="btn-warning"
                onClick={showExpenseModal}
              >
                Recurring Expenses
              </button>              <hr/>
                             <h3 className="expense-text">${expenses}</h3>
              <div className="divider" />
              <button
                type="submit"
                id="btn2"
                className="btn-primary"
                onClick={showSavingsModal}
              >
                Savings
              </button>
              <hr/>
                             <h3 className="savings-text">${savingsPerDay}</h3>
            </div>
          </div>
        </div>
      </div>
    </StyledBudget>
  );
}

export {Budget, BudgetModal};
