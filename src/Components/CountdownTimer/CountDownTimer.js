import React from 'react';

import './CountDownTimer.css';

export default class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemainingInSeconds: 5,
    };
    this.timer = null;
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

  // componentDidUpdate() {
  //   console.log(this.props.startTimeInSeconds);
  //   console.log(this.props.word);
  // }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }

  onButtonClick = () => {
    this.setState({
      timeRemainingInSeconds: 10,
    });
  };

  render() {
    // console.log('hitting render');
    console.log(this.state.timeRemainingInSeconds);
    return (
      <div className="countdown-timer">
        <div className="countdown-timer__circle">
          <svg>
            <circle
              r="90"
              cx="100"
              cy="100"
              style={{
                animation: `countdown-animation ${this.state.timeRemainingInSeconds}s linear`,
              }}
            />
          </svg>
        </div>
        {/* <div className="countdown-timer__text">
          {this.state.timeRemainingInSeconds + 1}
        </div> */}
        <button onClick={this.onButtonClick} className="btn btn-primary mt-5">
          Rerender
        </button>
      </div>
    );
  }
}
