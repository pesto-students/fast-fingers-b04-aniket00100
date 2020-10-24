import React from 'react';

import Game from './Components/Game/Game';
// import Countdown from './Components/CountdownTimer/Countdown2';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game playerName="Aniket" level="hard" />
    </div>
  );
}

export default App;
