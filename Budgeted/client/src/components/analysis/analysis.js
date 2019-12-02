import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {StyledAnalysis} from './analysis.styled.js'
import {Chart, Bar} from 'react-chartjs-2'
import CurrencyInput from 'react-currency-input'


function Analysis() {
  //localStorage.clear();
  const [userData, setUserData] = useState({})
  const [chartData, setChartData] = useState({})
  const [data, setData] = useState([])
  const [total,setTotal] = useState(0)
  const [average, setAverage] = useState(0)

  function formatDate(dateStr){
    let date = new Date(dateStr);
    let weekDays = ["Mon","Tues","Wed", "Thurs","Fri","Sat","Sun"]


    return weekDays[date.getDay()];
  }

  useEffect(() => {

    //  Authenticate user and get user Data
    const tmp = JSON.parse(localStorage.getItem('userData'));
    let url = '/user/analysis';
    axios.defaults.headers.common['Authorization'] = tmp.token;
    axios.get(url).then(res => {
      console.log(res.data)
      Chart.defaults.global.defaultFontColor = 'white';
      Chart.defaults.global.legend.display = false;
      Chart.defaults.global.responsive = true;
      let graphLabels = []
      let graphData = []
      let total = 0;
      let average = 0;


      for(let i = 0; i < res.data.analysis.length; i ++ ){
        graphLabels.push(formatDate(res.data.analysis[i].analysis_date))
        total += res.data.analysis[i].surplus;
        graphData.push(res.data.analysis[i].surplus)
      }
      setAverage((total/res.data.analysis.length).toFixed(2))
      setTotal(total.toFixed(2))
      console.log("TOTAL: " + total)
      console.log("AVERAGE: " + average)
      setChartData({
        labels: graphLabels,
        datasets: [
          {
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 0,
            borderSkipped: 'right',
            hoverBackgroundColor: 'white',
            hoverBorderColor: 'white',
            data: graphData
          }
        ]

      })

    })

  }, [])



  return (<StyledAnalysis>
    <div className="container">

      <h2>Daily Surplus</h2>

      <div className="chart">
        <h4>Total: ${total}</h4>
        <h4>Average: ${average}</h4>
        <Bar data={chartData} options={{
            responsive: true,
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    display: true,
                    beginAtZero: true,
                    autoSkip: true
                  },
                  scaleLabel: {
                    display: true
                  },
                  gridLines: {
                    color: "white",
                    display: false,
                    drawBorder: true //<- set this
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    display: true,
                    beginAtZero: true,
                    autoSkip: false,
                    callback: function(value, index, values) {
                      if(parseInt(value) >= 1000){
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      } else {
                        return '$' + value;
                      }
                    }
                  },
                  scaleLabel: {
                    display: true
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
