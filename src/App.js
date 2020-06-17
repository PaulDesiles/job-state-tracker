import React from 'react';
import './App.css';
import Organizer from './Components/Organizer'

function App() {
  return (
    <div className="App">
      <div className="appContent">
        <h3>Job applications state tracking</h3>
        <h4>stay organized !</h4>
        <Organizer />
      </div>
    </div>
  );
}

export default App;
