import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {StyledDashboard} from './dashboard.styled.js';
//

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const tmp = JSON.parse(localStorage.getItem('userData'));
    const url = '/user/dashboard';

    axios.defaults.headers.common['Authorization'] = tmp.token;

    axios.get(url).then(res => {
      setUserData(res.data.user[0]);
    })

  }, [])

  return (
      <StyledDashboard>
      <div class="container">

        <h2>Hello {userData.name},</h2>
        <h2>Your Budget: $</h2>


        <div class="graph">
          <hr/>
          <div class="mom">
            <div class="child">
                <p>Today</p>
                <p><b>$$$</b></p>
            </div>
            <div class="child">
              <p>Monday</p>
              <p><b>$$$</b></p>
            </div>
            <div class="child">
            <p>Tuesday</p>
            <p><b>$$$</b></p>
            </div>
        </div>

        </div>

      </div>
    </StyledDashboard>

);
}

export default Dashboard;
