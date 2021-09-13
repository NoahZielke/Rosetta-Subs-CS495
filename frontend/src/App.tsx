import React from 'react';
import {Navbar} from './components/Navbar'

function App() {
  return (
    <div className="App" style={{margin: 0, padding: 0}}>
      <Navbar />
        <h1> hello world</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Docs
        </a>
    </div>
  );
}

export default App;
