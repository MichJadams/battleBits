import React, { Component } from 'react';
import '../style/landing.css';


export default class landing extends Component {
  constructor(props) {
    super()
}
componentWillMount(){
    this.handleSubmitPractice = this.handleSubmitPractice.bind(this)
    this.handleSubmitPlay = this.handleSubmitPlay.bind(this)
  }
  
  handleSubmitPractice() {
    this.props.history.push({ pathname: `/practiceSettings`})
  }
  handleSubmitPlay() {
    this.props.history.push({ pathname: `/battleSettings`})
  }
  render() {
    return (
      <div className="LandingPageContainer">
        <div className="LandingPageheader">
          <button className="LandingPageItem" autoFocus type="button" onClick={this.handleSubmitPractice}>Practice!</button>
        <button className="LandingPageItem" autoFocus onClick={this.handleSubmitPlay}>Play BattleBits!</button>
        </div>
      </div>
    );
  }
}

