import React from 'react';

import './CountdownTimer.css';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.timeForWord,
      prevWordTime: props.timeForWord,
      strokeDasharray: '283',
      maxTimer: 10,
      currentScore: 0,
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
      this.setCircleDashArray(this.props.timeForWord);
    }, 1000);
  }

  // the words are coming in from the parent(Game) component
  // here checking if a new word has come.
  // if and only if a new word comes in the props, then this component should update

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      if (this.timer !== null) clearInterval(this.timer);
      const score = this.state.prevWordTime - this.state.timeLeft;
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
        this.setCircleDashArray(this.props.timeForWord);
      }, 1000);

      this.setState({
        ...this.state,
        timeLeft: this.props.timeForWord,
        currentScore: this.state.currentScore + score,
        prevWordTime: prevProps.timeForWord,
        strokeDashArray: '283 283',
      });
    }
  }

  // added because of the error
  // canceling subscription of all timers

  componentWillUnmount() {
    console.log('component will unmount!');
    clearInterval(this.timer);
  }

  // decerements the time you see inside the countdown timer
  // also handles gameOver scenario
  // clears the set interval when game over condition occurs

  decrementTimeRemaining = () => {
    if (this.state.timeLeft > 0) {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
      });
    } else {
      clearInterval(this.timer);
      this.props.onGameOver();
    }
  };

  // function responsible for converting time to mm:ss format
  // everywhere time is stored in seconds

  renderTime = (time) => {
    // const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // if (seconds < 10) {
    //   seconds = `0${seconds}`;
    // }
    return `${seconds}`;
  };

  // this makes the countdown timer animation move

  setCircleDashArray = (maxTimer) => {
    let rawTimeFraction = this.state.timeLeft / maxTimer;
    rawTimeFraction = rawTimeFraction - (1 / maxTimer) * (1 - rawTimeFraction);
    const circleDashArrayY = 283; //circumference of timer circle because the radius of svg circle is 45
    const circleDashArrayX = (rawTimeFraction * circleDashArrayY).toFixed(0);
    const strokeDashArray = `${circleDashArrayX} ${circleDashArrayY}`;
    this.setState({ ...this.state, strokeDasharray: strokeDashArray });
  };

  render() {
    return (
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            />
            <path
              id="base-timer-path-remaining"
              strokeDasharray={this.state.strokeDasharray}
              className="base-timer__path-remaining"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span className="base-timer__label">
          {this.renderTime(this.state.timeLeft)}
        </span>
      </div>
    );
  }
}
