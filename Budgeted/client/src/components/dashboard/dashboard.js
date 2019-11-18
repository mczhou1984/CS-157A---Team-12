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
    const tmp = JSON.parse(localStorage.getItem('userData'));
    const url = '/user/dashboard';
    axios.defaults.headers.common['Authorization'] = tmp.token;
    axios.get(url).then(res => {
      setUserData(res.data.user[0]);
    })

    //TODO:: axios calls to get graph Data
    initializeChart();

  }, [])

    function initializeChart() {
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
          backgroundColor: 'white',
          borderColor: 'white',
          borderWidth: 0,
          borderSkipped: 'right',
          hoverBackgroundColor: 'white',
          hoverBorderColor: 'white',
          data: [65, 59, 80]
        }
      ]

    })

  }

  return (<StyledDashboard>
    <div class="container">

      <h2>Hello {userData.name},</h2>
      <h2>Your Budget: $</h2>
      <hr/>

      <div className="chart">
        <Bar data={chartData} options={{
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true
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
                    display: false
                  },
                  scaleLabel: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false //<- set this
                  }
                }
              ]
            }

          }}/>

      </div>

    </div>
  </StyledDashboard>);
}

export default Dashboard;
