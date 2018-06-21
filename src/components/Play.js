import React, { Component } from 'react';
import '../style/Play.css';


export default class Play extends Component {
  constructor(props){
    super(props)
    this.state={
      startTime:  false, 
      difficulty: 256, 
      showMod: false,
      number: 0, 
      inputArry: [0,0,0,0,0,0,0,0],
      solutionArray: [],
      won: false,
      powers:[]
    }
    this.randomInteger = this.randomInteger.bind(this)
    this.toggle = this.toggle.bind(this)
    this.findSolution = this.findSolution.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.findPowers = this.findPowers.bind(this)
    this.calcAmountLeft = this.calcAmountLeft.bind(this)
  }
  componentWillMount(){
    console.log("the props",this.props.history.location.State)
    this.setState({difficulty:this.props.history.location.State.difficulty, 
      showMod: this.props.history.location.State.showMod, 
      showPow: this.props.history.location.State.showPow})
    this.setState({number:this.randomInteger()},()=>{
      this.setState({solutionArray:this.findSolution()})
      this.setState({powers: this.findPowers()},()=>{
        this.calcAmountLeft()
      })
    })

  }
  calcAmountLeft(){
    let newamountleft = this.state.number
    this.state.inputArry.map((el,index)=>{
      if(el){
        newamountleft = newamountleft - this.state.powers[index]
      }
    })
    this.setState({amountLeft:newamountleft})
  }
  findPowers(){
    let outarr = []
    this.state.inputArry.map((_,ind)=>{
      outarr.push(Math.pow(2,this.state.inputArry.length - ind -1))
    })
    return outarr
  }

  randomInteger(){
    return Math.floor(Math.random() * this.state.difficulty)
  }
  findSolution(){
    let binary = this.state.number.toString(2).padStart(this.state.inputArry.length,"0").split("")
    // console.log("")
    //  this.setState({solutionArray:binary})
    return binary
  }
  toggle(event){
    let copyOfState = this.state.inputArry.slice()
    copyOfState[+event.currentTarget.dataset.id] = +!copyOfState[+event.currentTarget.dataset.id]
    let failed = false 
    copyOfState.map((el, ind)=>{
      if(el !== +this.state.solutionArray[ind]){
        failed = true 
      }
    })
    if(!failed){
      console.log("won")
      this.setState({won:true})
    }
    this.setState({inputArry: copyOfState},()=>{
      this.calcAmountLeft()
    })
  }
  playAgain(){

    this.setState({
      startTime:  false, 
      difficulty: 100, 
      showMod: false,
      inputArry: [0,0,0,0,0,0,0,0],
      won: false
    },()=>{
      this.setState({number:this.randomInteger()},()=>{
        this.setState({solutionArray:this.findSolution()},()=>{
          this.calcAmountLeft()
        })
      })
    })
    }

  render() {
    console.log("the show", this.state.showPow)
        return (<div className="aboutMeContainer">
           <div>This is your number: {this.state.number}</div>
           <div>The boxes start out showing all zeros. Click on them to toggle them to creat the binary representation of the decimal number  {this.state.number}</div>
           <div>(coming soon)Timer:</div>
           {
             this.state.showMod == 'true'? <div>The amount of decimal number to still 'take away': {this.state.amountLeft}</div>:null
           }
           {
             this.state.showPow == 'true'? <div>This is the amount that placeing a 1 here represents</div>: null
           }
           <div className='binaryBox'>
           {
             this.state.showPow === 'true'? this.state.powers.map((el,ind)=>{
               return (<div className='binary' key={ind}>{el}</div>)
              }):null
           }
           </div>
           <div className='binaryBox'>
            {
              this.state.inputArry.map((el, ind)=>{
              return (
                  <div className='binary' key={ind} data-id={ind} onClick={this.toggle}>{el}</div>
              )
            })
          }
           </div>
           {
             this.state.won?
             <div onClick={this.playAgain}><button>You won!Play again?</button ></div>
             :null
           }
        </div>)      
  }
}

