import React from 'react';

import CountDownTimer from '../CountdownTimer/Countdown2';
import data from '../../data/dictionary.json';
import './Game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.INITIAL_STATE = {
      currentWord: '',
      userInput: '',
      startTimer: false,
      level: this.props.level,
      difficultyFactor: null,
      words: {},
      timeForWord: 10,
      gameOver: false,
      currentScore: 0,
    };

    this.state = { ...this.INITIAL_STATE };
    this.scoreList = [];
  }

  componentDidMount() {
    const easyWords = [];
    const mediumWords = [];
    const hardWords = [];

    for (let word of data) {
      if (word.length <= 4) easyWords.push(word);
      else if (word.length <= 8) mediumWords.push(word);
      else hardWords.push(word);
    }
    const words = { easy: easyWords, medium: mediumWords, hard: hardWords };

    let difficultyFactor;

    if (this.state.level === 'easy') {
      difficultyFactor = 1;
    } else if (this.state.level === 'medium') {
      difficultyFactor = 1.5;
    } else {
      difficultyFactor = 2;
    }

    const newWord = this.getNewWord(words, difficultyFactor);
    const timeForWord = Math.floor(newWord.length / difficultyFactor) + 1;

    this.setState({
      ...this.state,
      startTimer: true,
      words: words,
      currentWord: newWord,
      difficultyFactor: difficultyFactor,
      timeForWord: timeForWord,
    });
  }

  getNewWord = ({ easy, medium, hard }, difficultyFactor = null) => {
    if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
      const random = Math.round(Math.random() * (medium.length - 1));
      return medium[random].toUpperCase();
    }
    if (difficultyFactor < 1.5) {
      const random = Math.round(Math.random() * (easy.length - 1));
      return easy[random].toUpperCase();
    }
    const random = Math.round(Math.random() * (hard.length - 1));
    return hard[random].toUpperCase();
  };

  getCurrentWordComponent = () => {
    const wordCharacters = this.state.currentWord.split('');
    const userInputCharacters = this.state.userInput.split('');
    return (
      <div className="new-word">
        {wordCharacters.map((char, i) => {
          let color;
          if (i < this.state.userInput.length) {
            color = char === userInputCharacters[i] ? 'green' : 'red';
          }
          return (
            <span key={i} style={{ color: color }}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  getScoreList = () => {
    if (this.scoreList.length === 0) {
      return;
    }
    const scoresList = this.scoreList.map((score, i) => (
      <p key={i} className="text">{`Score #${i + 1}: ${score}`}</p>
    ));
    return scoresList;
  };

  onUserInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (value === this.state.currentWord) {
      const difficultyFactor = this.state.difficultyFactor + 0.1;

      let level;
      if (difficultyFactor >= 2) level = 'hard';
      else if (difficultyFactor < 1.5) level = 'easy';
      else level = 'medium';

      if (this.state.level !== level) console.log('level changed!');

      const newWord = this.getNewWord(this.state.words, difficultyFactor);
      const timeForWord = Math.floor(newWord.length / difficultyFactor) + 1;

      this.setState({
        ...this.state,
        currentWord: newWord,
        userInput: '',
        timeForWord: timeForWord,
        level: level,
        difficultyFactor: parseFloat(difficultyFactor.toFixed(1)),
      });
    } else {
      this.setState({ ...this.state, userInput: value });
    }
  };

  setScore = (value) => {
    this.setState({ ...this.state, currentScore: value });
  };

  onGameOver = () => {
    this.scoreList.push(this.state.currentScore);
    this.setState({ ...this.state, gameOver: true });
  };

  onPlayAgain = () => {
    this.setState({ ...this.INITIAL_STATE }, this.componentDidMount);
  };

  render() {
    console.log(this.state.currentScore);
    // if creating three arrays takes time

    let timerComponent;
    if (this.state.startTimer) {
      timerComponent = (
        <CountDownTimer
          timeForWord={this.state.timeForWord}
          onGameOver={this.onGameOver}
          word={this.state.currentWord}
          setScore={this.setScore}
        />
      );
    } else timerComponent = <h3 className="text">Loading...</h3>;

    // game over check
    let gameControls;
    if (this.state.gameOver) {
      gameControls = (
        <div className="text-center text">
          <h1>GAME OVER!!!!!</h1>
          <br></br>
          <h1>{`Your Score ${this.state.currentScore}`}</h1>
          <br></br>
          <button onClick={this.onPlayAgain}>Play Again</button>
        </div>
      );
    } else {
      gameControls = (
        <div className="div-timer text-center">
          <div className="timer">{timerComponent}</div>
          <br></br>
          {this.getCurrentWordComponent()}
          <br></br>
          <input
            value={this.state.userInput}
            onChange={this.onUserInputChange}
            className="input-box"
            autoFocus
          ></input>
          <br></br>
          <p>{this.state.userInput}</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex bd-highlight mb-3">
            <div className="mr-auto p-2 bd-highlight">
              <div className="text">
                {`Player Name: ${this.props.playerName}`}
              </div>
              <br />
              <div className="text">{`Level: ${this.state.level}`}</div>
            </div>
            <div className="p-2">
              <div className="text">Fast Fingers</div>
              <br />
              <div className="text">{`Current Score: ${this.state.currentScore}`}</div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-3">
            <div className="text-center">
              <div className="scores-box">
                <div className="mt-2">
                  <h3 className="text">Scores</h3>
                  {this.getScoreList()}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">{gameControls}</div>
        </div>
      </div>
    );
  }
}
