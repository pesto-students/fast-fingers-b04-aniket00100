import React from 'react';

import './CountDownTimer.css';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: props.startTimeInSeconds - 1,
    };
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.timer !== null) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
      this.setState({ timeRemainingInSeconds: this.props.startTimeInSeconds });
    }
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1,
      });
    } else {
      this.props.onGameOver();
      clearInterval(this.timer);
    }
  };

  componentDidMount() {
    console.log(this.props.startTimeInSeconds);
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  render() {
    // console.log(this.state.timeRemainingInSeconds);
    return (
      <div className="countdown-timer">
        <div className="countdown-timer__circle">
          <svg>
            <circle
              r="90"
              cx="100"
              cy="100"
              style={{
                animation: `countdown-animation ${this.state.startTimeInSeconds}s linear`,
              }}
            />
          </svg>
        </div>
        <div className="countdown-timer__text">
          {this.state.timeRemainingInSeconds + 1}
        </div>
      </div>
    );
  }
}
