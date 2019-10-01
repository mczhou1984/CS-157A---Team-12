import React, {useState, useEffect} from 'react';
import './login.module.scss';

function Login() {
  const [users, setUsers] = useState([]);



  // useEffect(() => {
  //   async function fetchMyAPI(){
  //     const url = '/user/register';
  //     const response = await fetch(url);
  //     const json =  await response.json();
  //     console.log(json);
  //     setUsers(json);
  //
  //   }
  //   fetchMyAPI();
  // }, []);



  return (
    <div>
    <h2>Login</h2>

    </div>
  );
}


export default Login;
