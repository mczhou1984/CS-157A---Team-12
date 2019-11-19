import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {StyledDashboard} from './dashboard.styled.js';
import {Chart, Bar} from 'react-chartjs-2';
import CurrencyInput from 'react-currency-input';
//





function Dashboard() {
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState({});
  const [balance, setBalance] = useState(0);
  useEffect(() => {

    //Authenticate user and get user Data
    // const tmp = JSON.parse(localStorage.getItem('userData'));
    // const url = '/user/dashboard';
    // axios.defaults.headers.common['Authorization'] = tmp.token;
    // axios.get(url).then(res => {
    //   setUserData(res.data.user[0]);
    // })

    //TODO:: axios calls to get graph Data
    initializeChart();




  },[])
  function hideModal1() {

	  document.querySelector('.bg-modal1').style.display = "none"
  }
  function hideModal2() {

    document.querySelector('.bg-modal2').style.display = "none"
  }
  function showModal1(){

	document.querySelector('.bg-modal1').style.display = "flex"

  }
  function showModal2(){

	document.querySelector('.bg-modal2').style.display = "flex"

  }
  function initializeChart() {
      const data = [10, -20, 40];
      const colours = data.map((value) => value < 0 ? 'light-red' : 'white');

    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.legend.display = false;
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
          backgroundColor:colours,
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
          responsive:true,
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
                    autoSkip:true
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
      <button type="submit" id="btn1" class="button" onClick={showModal2}> + </button>
      <div class="divider"/>
      <button type="submit" id="btn2" class="button" onClick={showModal1}> - </button>
      </div>





    </div>
    <div class="bg-modal1">
<div class="modal-contents">

  <div class="close" onClick={hideModal1}>+</div>

  <form action="">
  <select name="type">
  <option value="general">General</option>
  <option value="groceries">Groceries</option>
  <option value="household">Household</option>
  <option value="transportation">Transportation</option>
</select>
    <CurrencyInput class="form-control mr-sm-2" prefix="-$" value="0.00"/>
    <input class="form-control mr-sm-2" type="text" value="Today" readonly/>
    <a href="#" class="btn btn-primary">Submit</a>
  </form>

</div>
</div>
<div class="bg-modal2">
<div class="modal-contents">

<div class="close" onClick={hideModal2}>+</div>

<form action="">
<select name="type">
<option value="general">Extra Income</option>
<option value="groceries">Investment</option>
</select>
<CurrencyInput class="form-control mr-sm-2" prefix="+$" value="0.00"/>
<input class="form-control mr-sm-2" type="text" value="Today" readonly/>
<a href="#" class="btn btn-primary">Submit</a>
</form>

</div>
</div>
  </StyledDashboard>);
}

export default Dashboard;
