import React from 'react';

import Game from './Components/Game/Game';
// import Countdown from './Components/CountdownTimer/Countdown2';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      gameOn: false,
      playerName: '',
      selectedLevel: 'default',
      playerNameError: '',
      selectedLevelError: '',
    };
    this.state = { ...this.initialState };
  }

  // handles the change in difficulty level select element

  setLevel = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      selectedLevel: value,
      selectedLevelError: '',
    });
  };

  // handles the player name change

  onPlayerNameChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      playerName: value,
      playerNameError: '',
    });
  };

  // this method validates the user input
  // if player name is empty, a proper message will be shown below the input field
  // same with difficulty level.
  // this method is called every time when 'start game' button is clicked.
  // this method also sets proper error message to display on the screen
  // returns true or false

  validateInput = () => {
    let playerNameError = '';
    let selectedLevelError = '';
    if (this.state.playerName.length === 0) {
      playerNameError = 'Please enter your name.';
    }
    if (this.state.selectedLevel === 'default') {
      selectedLevelError = 'Please select a level.';
    }
    if (playerNameError.length > 0 && selectedLevelError.length > 0) {
      this.setState({
        ...this.state,
        playerNameError: playerNameError,
        selectedLevelError: selectedLevelError,
      });
      return false;
    }
    return true;
  };

  // handles 'start game' condition
  // calls validateInput() to check if the user input is valid
  // and sets the gameOn on state to be true

  onStartGame = () => {
    const isValid = this.validateInput();
    console.log(isValid);
    console.log(this.state);
    if (isValid) {
      this.setState({ ...this.state, gameOn: true });
    }
  };

  // handles stop/quit game button that is visible only when game is on or game is over.
  // when 'stop game; button is clicked, the state is set to initial state.

  onStopGame = () => {
    this.setState({ ...this.initialState });
  };

  // returns JSX that displays the landing component
  // title, two inputs and one button

  startGameComponent = () => {
    return (
      <div className="start-game-element">
        <div className="div-title">
          <img
            src={require('./images/icons/keyboard.png')}
            alt="Fast Fingers"
            className="img-keyboard"
          ></img>
          <br></br>
          <br></br>
          <h1 className="text">FAST FINGERS</h1>
        </div>
        <div className="">
          <input
            placeholder="TYPE YOUR NAME"
            onChange={this.onPlayerNameChange}
            value={this.state.playerName}
            className="input-name"
          ></input>
          <div className="input-error">{this.state.playerNameError}</div>
          <br></br>
          <select
            className="select-level"
            // aria-label="Default select example"
            placeholder="DIFFICULTY LEVEL"
            onChange={this.setLevel}
            defaultValue="default"
          >
            <option value="default" disabled>
              DIFFICULTY LEVEL
            </option>
            <option value="easy">EASY</option>
            <option value="medium">MEDIUM</option>
            <option value="hard">HARD</option>
          </select>
          <div className="input-error">{this.state.selectedLevelError}</div>
          <br></br>
          <button className="btn-start-game" onClick={this.onStartGame}>
            <img
              className="icon-play"
              src={require('./images/icons/play.png')}
              alt=""
            />
            START GAME
          </button>
        </div>
      </div>
    );
  };

  render() {
    let startGame;
    let stopGameButton;
    if (this.state.gameOn) {
      startGame = (
        <Game
          playerName={this.state.playerName}
          level={this.state.selectedLevel}
        />
      );
      stopGameButton = (
        <div className="row">
          <div className="col-md-3">
            <div className="start-game-element">
              <button className="btn-quit-game" onClick={this.onStopGame}>
                <img
                  className="icon-play"
                  src={require('./images/icons/cross.png')}
                  alt=""
                />
                STOP GAME
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      startGame = this.startGameComponent();
      stopGameButton = null;
    }

    return (
      <div className="app">
        {startGame}
        {stopGameButton}
      </div>
    );
  }
}

export default App;
