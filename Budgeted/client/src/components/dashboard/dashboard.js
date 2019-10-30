import React, {useState, useEffect} from 'react';
import axios from 'axios';
//

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(()=>{
    const tmp = JSON.parse(localStorage.getItem('userData'));
    const url = '/user/dashboard';

    axios.defaults.headers.common['Authorization'] =
                                tmp.token;


      axios.get(url)
      .then(res =>{
          setUserData(res.data.user[0]);
      })



  }, [])

  return (
    <div>
    <h2>Hello {userData.name}</h2>

    </div>
  );
}


export default Dashboard;
