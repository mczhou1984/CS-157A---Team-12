import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {StyledAnalysis} from './analysis.styled.js'
import {Chart, Bar} from 'react-chartjs-2'
import CurrencyInput from 'react-currency-input'


function Analysis() {
  //localStorage.clear();
  const [userData, setUserData] = useState({});
  const [chartData, setChartData] = useState({});
  const [data, setData] = useState([])
  const [budget,setDailyBudget] = useState(0)

  useEffect(() => {

  //  Authenticate user and get user Data
    const tmp = JSON.parse(localStorage.getItem('userData'));
    let url = '/user/dashboard';
    axios.defaults.headers.common['Authorization'] = tmp.token;
    axios.get(url).then(res => {
      console.log(res.data)
      setUserData(res.data.user[0])
      let dailybudget = res.data.balance.daily_budget-res.data.balance.daily_budget*res.data.balance.savingPercentage
//      let balance = (res.data.balance.balance-res.data.balance.balance*res.data.balance.savingPercentage)
      let trans_sum = res.data.balance.trans_sum
      let date = new Date(res.data.balance.date)
      let nday = nextDay(date.getDay()+1)
      let dayAfterNext = nextDay(date.getDay()+2)
      setDailyBudget((dailybudget+trans_sum).toFixed(2))
      Chart.defaults.global.defaultFontColor = 'white';
      Chart.defaults.global.legend.display = false;
      Chart.defaults.global.responsive = true;
      console.log(res.data.balance.daily_budget*res.data.balance.savingPercentage);
      setChartData({
        labels: [
          [
            'Today', '$'+(dailybudget+trans_sum).toFixed(2)
          ],
          [
            nday, '$'+(dailybudget+dailybudget+trans_sum).toFixed(2)
          ],
          [
            dayAfterNext, '$'+(dailybudget+dailybudget*2+trans_sum).toFixed(2)
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
            data: [(dailybudget+trans_sum).toFixed(2),(dailybudget+dailybudget+trans_sum).toFixed(2),(dailybudget+dailybudget*2+trans_sum).toFixed(2)]
          }
        ]

      })

    })


    //TODO:: axios calls to get graph Data
    //initializeChart()

  }, [])


function nextDay(day){
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"];



  return dayNames[day+1]





}

  return (<StyledAnalysis>
    <div className="container">

      <h2>Hello {userData.name},</h2>
      <h2>Your Budget: ${budget}</h2>

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


    </div>
    </StyledAnalysis>);
}

export default Analysis
