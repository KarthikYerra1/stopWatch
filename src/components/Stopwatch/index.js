import {Component} from 'react'

import './index.css'

class StopWatch extends Component {
  state = {
    isTimerRunning: false,
    secondsCounted: 0,
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      secondsCounted: 0,
    })
  }

  stopTimer = () => {
    this.setState({isTimerRunning: false})
    this.clearTimerInterval()
  }

  increaseTimer = () => {
    const {secondsCounted} = this.state

    if (secondsCounted >= 3600) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    }
    this.setState(prevState => ({
      secondsCounted: prevState.secondsCounted + 1,
    }))
  }

  startTimer = () => {
    const {isTimerRunning, secondsCounted} = this.state

    if (secondsCounted >= 3600) {
      this.setState({secondsCounted: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimer, 1000)
    }
    this.setState({
      isTimerRunning: true,
    })
  }

  timeFormat = () => {
    const {secondsCounted} = this.state
    const minutes = Math.floor(secondsCounted / 60)
    const seconds = Math.floor(secondsCounted % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              className="logo"
              alt="stopwatch"
            />
            <p className="timer-text">Timer</p>
          </div>
          <h1 className="time-container">{this.timeFormat()}</h1>
          <div className="buttons-container">
            <button
              className="btn btn-start"
              type="button"
              disabled={isTimerRunning}
              onClick={this.startTimer}
            >
              Start
            </button>
            <button
              className="btn btn-stop"
              type="button"
              onClick={this.stopTimer}
            >
              Stop
            </button>
            <button
              className="btn btn-reset"
              type="button"
              onClick={this.onResetTimer}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default StopWatch
