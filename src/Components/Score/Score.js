import React from 'react';

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameOver: props.gameOn, currentScore: 0 };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.updateScore('from did mount');
    }, 1000);
  }

  componentWillUnmount() {
    // this.props.setScore(this.state.currentScore);
    console.log('score will unmount!');
    clearInterval(this.timer);
  }

  // updates score realtime
  // when the setState is triggered, I am passing a callback function to setState call
  // which I am recieving in props
  // this callback function calls setScore function from the parent
  // which updates the currentScore property of parent component's local state.

  updateScore = (message) => {
    // console.log(message);
    this.setState(
      { ...this.state, currentScore: this.state.currentScore + 1 },
      () => {
        this.props.setScore(this.state.currentScore - 1);
      }
    );
  };

  render() {
    return (
      <span>
        {`SCORE: ${this.props.convertSecondsToMMSS(this.state.currentScore)}`}
      </span>
    );
  }
}
