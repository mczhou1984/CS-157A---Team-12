import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {StyledDashboard} from './dashboard.styled.js';
import {Chart, Bar} from 'react-chartjs-2';
import CurrencyInput from 'react-currency-input';
//

function Dashboard() {
  //localStorage.clear();
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState({});
  const [balance, setBalance] = useState(0);
  useEffect(() => {

  //  Authenticate user and get user Data
    const tmp = JSON.parse(localStorage.getItem('userData'));
    const url = '/user/dashboard';
    axios.defaults.headers.common['Authorization'] = tmp.token;
    axios.get(url).then(res => {
      setUserData(res.data.user[0])
    })

    //TODO:: axios calls to get graph Data
    initializeChart()

  }, [])

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

    hideModal2()
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

    hideModal1()
  }
  function hideModal1() {
        document.getElementById("negInput").value = '-$0.00'
    document.querySelector('.bg-modal1').style.display = "none"
  }
  function hideModal2() {
    document.getElementById("posInput").value = '+$0.00'

    document.querySelector('.bg-modal2').style.display = "none"
  }
  function showModal1() {

    document.querySelector('.bg-modal1').style.display = "flex"

  }
  function showModal2() {

    document.querySelector('.bg-modal2').style.display = "flex"

  }
  function initializeChart() {
    const data = [10, -20, 40];
    const colours = data.map(
      (value) => value < 0
      ? 'light-red'
      : 'white');

    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.responsive = true;
    setChartData({
      labels: [
        [
          'Today', '$$$'
        ],
        [
          'Monday', '$$$'
        ],
        [
          'Tuesday', '$$$'
        ]
      ],
      datasets: [
        {
          backgroundColor: colours,
          borderColor: 'white',
          borderWidth: 0,
          borderSkipped: 'right',
          hoverBackgroundColor: 'white',
          hoverBorderColor: 'white',
          data: data
        }
      ]

    })

  }

  return (<StyledDashboard>
    <div class="container">

      <h2>Hello {userData.name},</h2>
      <h2>Your Budget: $</h2>

      <div className="chart">
        <Bar data={chartData} options={{
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: false
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false //<- set this
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    display: false,
                    beginAtZero: true,
                    autoSkip: true
                  },
                  scaleLabel: {
                    display: false
                  },
                  gridLines: {
                    color: "transparent",
                    display: true,
                    drawBorder: false,
                    zeroLineColor: "#ccc",
                    zeroLineWidth: 1
                  }
                }
              ]
            }

          }}/>

      </div>

      <div class="btnDiv">
        <button type="submit" id="btn1" class="button" onClick={showModal2}>
          +
        </button>
        <div class="divider"/>
        <button type="submit" id="btn2" class="button" onClick={showModal1}>
          -
        </button>
      </div>

    </div>
    <div class="bg-modal1">
      <div class="modal-contents">

        <div class="close" onClick={hideModal1}>+</div>

        <form onSubmit={handleNegativeTransaction}>
          <select name="type" id="category1">
            <option value="General">General</option>
            <option value="Groceries">Groceries</option>
            <option value="Household">Household</option>
            <option value="Transportation">Transportation</option>
          </select>
          <CurrencyInput allowEmpty="false" id="negInput" class="form-control mr-sm-2" prefix="-$" value="0.00"/>
          <input class="form-control mr-sm-2" type="text" value="Today" readonly="readonly"/>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
    <div class="bg-modal2">
      <div class="modal-contents">

        <div class="close" onClick={hideModal2}>+</div>

        <form onSubmit={handlePositiveTransaction}>
          <select name="type" id="category2">
            <option value="Extra Income">Extra Income</option>
            <option value="Investment">Investment</option>
          </select>
          <CurrencyInput allowEmpty="false" id="posInput" class="form-control mr-sm-2" prefix="+$" value="0.00"/>
          <input class="form-control mr-sm-2" type="text" value="Today" readonly="readonly"/>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
  </StyledDashboard>);
}

export default Dashboard;
