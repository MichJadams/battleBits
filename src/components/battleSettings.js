import React, { Component } from 'react';
import '../style/battleSettings.css';


export default class battleSettings extends Component {
  constructor() {
    super()
    this.state = {
      startTime: 0,
      difficulty: 8,
      showMod: 'false',
      showPow: 'false',
      lives: 3,
      highest: 8,
    }
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
    this.handleshowModChange = this.handleshowModChange.bind(this)
    this.handleshowPowChange = this.handleshowPowChange.bind(this)
    // this.handleSubmitPractice = this.handleSubmitPractice.bind(this)
    this.handleSubmitPlay = this.handleSubmitPlay.bind(this)
    this.handleLivesChange = this.handleLivesChange.bind(this)
    this.handlehighestChange = this.handlehighestChange.bind(this)
    this.backToSelect = this.backToSelect.bind(this)
  }
  handleDifficultyChange(event) {
    this.setState({ difficulty: event.target.value })
  }
  handleshowModChange(event) {
    this.setState({ showMod: event.target.value })
  }
  handleLivesChange(event) {
    this.setState({ lives: event.target.value })
  }
  handleshowPowChange(event) {
    this.setState({ showPow: event.target.value })
  }
  handlehighestChange(event) {
    this.setState({ highest: event.target.value })
  }
  handleSubmitPlay() {
    this.props.history.push({ pathname: `/battleBits`, State: { highest: this.state.highest, difficulty: this.state.difficulty, showMod: this.state.showMod, showPow: this.state.showPow, lives: this.state.lives } })
  }
  backToSelect(){
    this.props.history.push({pathname:'/'})
  }
  render() {
    return (
      <div className="battleSettingsContainer">
        <div className="battleSettingsHeader">Prepare for battle</div>
        <form onSubmit={this.handleSubmit} className='gameOptionsForm'>
          <ul>
            The number of rows:
                <input type="number" value={this.state.difficulty} onChange={this.handleDifficultyChange} />
          </ul>
          <ul>
            highest decimal:
                <select type="number" value={this.state.highest} onChange={this.handlehighestChange} >
              <option value="1">2</option>
              <option value="2">4</option>
              <option value="3">8</option>
              <option value="4">16</option>
              <option value="5">32</option>
              <option value="6">64</option>
              <option value="7">128</option>
              <option value="8">256</option>
            </select>
          </ul>
          <ul>
            Lives:
                <input type="number" value={this.state.lives} onChange={this.handleLivesChange} />
          </ul>
          <ul>
            Show the various powers of 2? (1,2,4,8,16,32 ect...):
                <select value={this.state.showPow} onChange={this.handleshowPowChange}>
                <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </ul>
        </form>
        <button autoFocus className='battleBtn' onClick={this.handleSubmitPlay}>Play</button>
        <button  className='battleBtn' type="button" onClick={this.backToSelect}>Back</button>
      </div>
    );
  }
}

