import React, { Component } from 'react';
import '../style/Play.css';
import { findSolution, randomInteger } from '../helperFuncs'


export default class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: false,
      difficulty: 256,
      showMod: false,
      number: 0,
      inputArry: [0, 0, 0, 0, 0, 0, 0, 0],
      solutionArray: [],
      won: false,
      powers: [],
      highest: +props.history.location.State.highest
    }
    console.log('this is the highest,', props.history.location.State.highest)
    // this.randomInteger = this.randomInteger.bind(this)
    this.toggle = this.toggle.bind(this)
    // this.findSolution = this.findSolution.bind(this)
    this.backToSettings = this.backToSettings.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.findPowers = this.findPowers.bind(this)
    this.calcAmountLeft = this.calcAmountLeft.bind(this)
  }
  componentWillMount() {
    console.log("the props", this.props.history.location.State)
    this.setState({
      difficulty: this.props.history.location.State.difficulty,
      showMod: this.props.history.location.State.showMod,
      showPow: this.props.history.location.State.showPow,

    })
    this.setState({ number: randomInteger(this.state.highest) }, () => {
      this.setState({ solutionArray: findSolution(this.state.number) })
      this.setState({ powers: this.findPowers() }, () => {
        this.calcAmountLeft()
      })
    })

  }
  calcAmountLeft() {
    let newamountleft = this.state.number
    this.state.inputArry.map((el, index) => {
      if (el) {
        newamountleft = newamountleft - this.state.powers[index]
      }
    })
    this.setState({ amountLeft: newamountleft })
  }
  findPowers() {
    let outarr = []
    this.state.inputArry.map((_, ind) => {
      outarr.push(Math.pow(2, this.state.inputArry.length - ind - 1))
    })
    return outarr
  }

  toggle(event) {
    let copyOfState = this.state.inputArry.slice()
    copyOfState[+event.currentTarget.dataset.id] = +!copyOfState[+event.currentTarget.dataset.id]
    let failed = false
    copyOfState.map((el, ind) => {
      if (el !== +this.state.solutionArray[ind]) {
        failed = true
      }
    })
    if (!failed) {
      console.log("won")
      this.setState({ won: true })
    }
    this.setState({ inputArry: copyOfState }, () => {
      this.calcAmountLeft()
    })
  }
  backToSettings(){
    this.props.history.push({pathname: '/practiceSettings'})
  }
  playAgain() {
    this.setState({
      startTime: false,
      difficulty: 100,
      showMod: false,
      inputArry: [0, 0, 0, 0, 0, 0, 0, 0],
      won: false,
      number: randomInteger(+this.state.highest)
    }, () => {
      this.setState({ solutionArray: findSolution(this.state.number) }, () => {
        this.calcAmountLeft()
      })
    })
  }

  render() {
    return (<div className="practiceBitsContainer">
      <div className='practiceInfo'>This is your number:   {this.state.number}</div>
      <div className='practiceInfo'>Click the boxes to toggle them</div>
      <div className='practiceInfo'>(coming soon)Timer:</div>
      {
        this.state.showMod == 'true' ? <div className='practiceHint'>The amount of decimal number to still 'take away': {this.state.amountLeft}</div> : null
      }
      {
        this.state.showPow == 'true' ? <div className='practiceHint'>The top row shows you powers of two</div> : null
      }
      <div className='binaryBox'>
        {
          this.state.showPow === 'true' ? this.state.powers.map((el, ind) => {
            return (<div className='binaryHelp' key={ind}>{el}</div>)
          }) : null
        }
      </div>
      <div className='binaryBox'>
        {
          this.state.inputArry.map((el, ind) => {
            return (
              <div className='binary' key={ind} data-id={ind} onClick={this.toggle}>{el}</div>
            )
          })
        }
      </div>
      {
        this.state.won ?
          <div className='btnBin'>
          <div>You won!</div>
          <button  className='practiceBtn' onClick={this.playAgain}>Play again?</button >
          <button className='practiceBtn' onClick={this.playAgain}>Back to settings</button >
          </div>
          : null
      }
    </div>)
  }
}

