import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../style/App.css';


export default class Home extends Component {
  constructor(){
    super()
    this.state={
      startTime: 0,
      difficulty:1,
      showMod: 'false', 
      showPow: 'false',
      
    }
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
    this.handleshowModChange = this.handleshowModChange.bind(this)
    this.handleshowPowChange = this.handleshowPowChange.bind(this)
    this.handleSubmitPractice = this.handleSubmitPractice.bind(this)
    this.handleSubmitPlay = this.handleSubmitPlay.bind(this)
  }
  handleDifficultyChange(event){
      this.setState({difficulty:event.target.value})
  }
  handleshowModChange(event){
    this.setState({showMod:event.target.value})
}
handleshowPowChange(event){
    this.setState({showPow: event.target.value},()=>{

        console.log("dsf",this.state.showPow)
    })
}
handleSubmitPractice(){
    this.props.history.push({pathname:`/play`, State: {difficulty: this.state.difficulty,showMod: this.state.showMod,showPow: this.state.showPow }})
}
handleSubmitPlay(){
    this.props.history.push({pathname:`/battleBits`, State: {difficulty: this.state.difficulty,showMod: this.state.showMod,showPow: this.state.showPow }})
}
  render() {
    return (
       <div className="LandingPageContainer">
          <div className="LandingPageheader">Landing page here!</div>
          <div>instructions here</div>
          <form onSubmit={this.handleSubmit} className='gameOptionsForm'>
              <ul>
                difficulty
                <input type="number" value={this.state.difficulty} onChange={this.handleDifficultyChange} />
              </ul>
              <ul>
                Show a second number that shows how much is 'left' to represent in binary:
                <select value={this.state.showMod} onChange={this.handleshowModChange}>
                  <option value="true">Yes</option>
                  <option value="false">No,</option>
                </select>
                </ul>
                <ul>
                Show the various powers of 2? (12,4,8,16,32 ect... :   
                <select value={this.state.showPow} onChange={this.handleshowPowChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                </ul>
                <button autoFocus type="button" onClick={this.handleSubmitPractice}>Practice!</button>
                </form>
                <button autoFocus onClick={this.handleSubmitPlay}>Place battleBits!</button>
       </div>
    );
  }
}

