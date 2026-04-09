import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000') // your backend endpoint
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setMessage('Error fetching message'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* React logo */}
        <img src={logo} className="App-logo" alt="logo" />

        {/* Message from backend */}
        <p>{message || 'Loading...'}</p>

        {/* Original React instructions */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;