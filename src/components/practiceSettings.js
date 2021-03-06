import React, { Component } from 'react';
import '../style/practiceSettings.css';


export default class practiceSettings extends Component {
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
    this.handleSubmitPractice = this.handleSubmitPractice.bind(this)
    // this.handleSubmitPlay = this.handleSubmitPlay.bind(this)
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
  handleSubmitPractice() {
    this.props.history.push({ pathname: `/play`, State: { highest: this.state.highest, difficulty: this.state.difficulty, showMod: this.state.showMod, showPow: this.state.showPow } })
  }
  backToSelect(){
    this.props.history.push({pathname:'/'})
  }
  render() {
    return (
      <div className="practiceSettingsContainer">
        <div className="practiceSettingsHeader">Practice: you will be prompted to toggle the boxes to match the provided deimcal number</div>
        <form onSubmit={this.handleSubmit} className='gameOptionsForm'>
          <ul>
            highest decimal
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
            Show a second number that shows how much is 'left' to represent in binary:
                <select value={this.state.showMod} onChange={this.handleshowModChange}>
              <option value="true">Yes</option>
              <option value="false">No,</option>
            </select>
          </ul>
          <ul>
            Show the various powers of 2? (1,2,4,8,16,32 ect...):
                <select value={this.state.showPow} onChange={this.handleshowPowChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </ul>
          </form>
          <button autoFocus type="button" className ='practiceBtn' onClick={this.handleSubmitPractice}>Practice!</button>
          <button  type="button" className ='practiceBtn'  onClick={this.backToSelect}>Back</button>
      </div>
    );
  }
}

