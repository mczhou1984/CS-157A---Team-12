import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyledDashboard} from './dashboard.styled.js';
import {Chart, Bar} from 'react-chartjs-2';
//

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState({});

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

  }, [])

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
      <button type="submit" id="btn1" class="btn btn-primary"> + </button>
      <div class="divider"/>
      <button type="submit" id="btn2" class="btn btn-primary"> - </button>
      </div>

    </div>
  </StyledDashboard>);
}

export default Dashboard;
