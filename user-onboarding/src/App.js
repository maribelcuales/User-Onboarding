import React, {useState} from 'react';
import Form from './Components/Form';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <h1>Form Sign Up</h1>
      <Form />
    </div>
  );
}

export default App;
