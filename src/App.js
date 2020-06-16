import React from 'react';
import './App.css';
import Organizer from './Components/Organizer'

function App() {
  const applicationData = [
    {id:0, name: "Space X", state:"sent"},
    {id:1, name: "ESA", state:"scheduled"}
  ];

  return (
    <div className="App">
      <h3>Applications state tracking</h3>
      <h4>stay organized !</h4>
      <Organizer data={applicationData} />
    </div>
  );
}

export default App;
