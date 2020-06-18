import React, {useState} from 'react';
import FormComponent from './Components/FormComponent';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = user => {
    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      terms: user.terms
    }
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1>Form Sign Up</h1>
      <FormComponent addUser={addUser}/>
      <div className="user-list">
        <h2>Users</h2>
        {users.map(user => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.password}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
