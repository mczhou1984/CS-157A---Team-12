import React, {useState, useEffect} from 'react';
import './users.css';

function Users() {
  const [users, setUsers] = useState([]);



  useEffect(() => {
    async function fetchMyAPI(){
      const url = '/user/profile';
      const response = await fetch(url);
      const json =  await response.json();
      console.log(json);
      setUsers(json);

    }
    fetchMyAPI();
  }, []);



  return (
    <div className="users">
    <h2>Users</h2>
    <ul>
      {users.map((user) => (
        <li key={user.accountId}>{user.name}</li>
      ))}
    </ul>

    </div>
  );
}


export default Users;
