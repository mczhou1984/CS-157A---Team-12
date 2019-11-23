import React, {useState, useEffect} from "react";
import axios from "axios";
import {StyledBudget} from "./budget.styled.js";
import CurrencyInput from "react-currency-input";
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
  console.log(localStorage.getItem("savings"))
  console.log(localStorage.getItem("budget"))
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
    window.location.reload();
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
    window.location.reload();
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
    window.location.reload();
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
          </div>
        </div>
        <div className="savings-modal">
          <div className="modal-contents">
            <div className="close" onClick={hideModal}>
              +
            </div>

            <form onSubmit={handleAddSaving}>
              <h2>{savings}%</h2>
              <h3>${savingsPerDay} /day</h3>
              <div class="slidecontainer">
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

  useEffect(() => {
    //TODO: Authenticate user and budget data
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
      localStorage.setItem("budget", res.data.budget.daily_budget)
      localStorage.setItem("savings", res.data.budget.savingPercentage)
    })
    //TODO:: axios calls to get graph Data
  }, [])

  return (
    <StyledBudget>
      <div className="container">
        <div class="card  mb-3">
          <div class="card-header bg-success">
            <h1>${budget}</h1>
            <h4>/day</h4>
          </div>
          <div class="card-body">
            <div className="btnDiv">
              <button
                type="submit"
                id="btn1"
                className="btn-success"
                onClick={showIncomeModal}
              >
                Regular Income
              </button>
              <div className="divider" />
              <button
                type="submit"
                id="btn2"
                className="btn-warning"
                onClick={showExpenseModal}
              >
                Recurring Expenses
              </button>
              <div className="divider" />
              <button
                type="submit"
                id="btn2"
                className="btn-primary"
                onClick={showSavingsModal}
              >
                Savings
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledBudget>
  );
}

export {Budget, BudgetModal};
