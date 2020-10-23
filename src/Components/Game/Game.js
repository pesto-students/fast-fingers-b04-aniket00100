import React from 'react';

import CountDownTimer from '../CountdownTimer/CountDownTimer';
import './Game.css';

export default class Game extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex bd-highlight mb-3">
            <div className="mr-auto p-2 bd-highlight">
              <div className="text">
                {`Player Name: ${this.props.playerName}`}
              </div>
              <br />
              <div className="text">{`Level: ${this.props.level}`}</div>
            </div>
            <div className="p-2">
              <div className="text">Fast Fingers</div>
              <br />
              <div className="text">{`Current Score: 00:00`}</div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-3">
            <div className="text-center">
              <p className="text">Scores</p>
              <div className="scores-box">
                <div className="mt-2">
                  <p className="text">score #</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text text-center">Timer and input</div>
            <div className="div-timer">
              <div className="timer">
                <CountDownTimer startTimeInSeconds={10} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text text-center">Nothing here!</div>
          </div>
        </div>
      </div>
    );
  }
}
