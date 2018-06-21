import React, { Component } from 'react';
import '../style/battleBits.css';
import hotDog from '../style/assets/hotDog.jpg'
import pizza from '../style/assets/pizza.jpg'

export default class Play extends Component {
  constructor(props){
    super(props)
    this.state={
      startTime:  false, 
      difficulty: 8, 
      showMod: false,
      number: 0, 
      grid:[[]],
      inputArry: [0,0,0,0,0,0,0,0],
      solutionArray: [],
      won: false,
      guess: 0,
      selectedRow: 0,
      dead: false, 
      lives: this.props.history.location.State.lives || 3
    }
    this.randomInteger = this.randomInteger.bind(this)
    this.findSolution = this.findSolution.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.checkRow = this.checkRow.bind(this)
    this.guessChange = this.guessChange.bind(this)
    this.generateGrid = this.generateGrid.bind(this)
    this.flashy = this.flashy.bind(this)
  }
  componentWillMount(){
    console.log("the highest",this.props.history.location.State.highest)
    this.setState({difficulty:this.props.history.location.State.difficulty, 
      showMod: this.props.history.location.State.showMod, 
      showPow: this.props.history.location.State.showPow},()=>{
          this.setState({grid: this.generateGrid()},()=>{
              console.log("the gird", this.state.grid)
          })
      })
  }
  generateGrid(){
        let gridout = []
      for(let i = 0; i < this.state.difficulty; i++){
          let row = this.findSolution(this.randomInteger())
        gridout.push(row)
      }
      return gridout
  }
  randomInteger(){
    return Math.floor(Math.random() * Math.pow(+this.state.highest,2))
  }
  findSolution(decimalNumber){
    let binary = decimalNumber.toString(2).padStart(8,"0").split("")
    return binary
  }
  guessChange(event){
    this.setState({guess:event.target.value})
  }
  checkRow(){
      let neededNum = Number.parseInt(this.state.grid[this.state.selectedRow].join(''),2)
      let inputNum =  this.state.guess.toString(2)
      console.log("the needed decimal value for this row is",neededNum)
      console.log("the input value in decimal is ",this.state.guess.toString(2))
      if(inputNum == neededNum){
          console.log("you are the smartest person alive")
          if(this.state.selectedRow === this.state.difficulty -1 ){
            console.log("YOU WON!!!!")
            this.setState({won:true})
          }else{
            let nextrow = this.state.selectedRow + 1
            this.setState({selectedRow:nextrow})
          }
      }else{
        let livesLeft = this.state.lives -1 
        this.setState({lives: livesLeft})
        if(livesLeft < 0){
          this.setState({dead:true})
        }
      } 
  }
 flashy(){
  //maybe do a cool thing here, for when they win
 }
  playAgain(){
    // this.setState({
    //   startTime:  false, 
    //   difficulty: this.props.history.location.State.difficulty, 
    //   showMod: false,
    //   number: this.randomInteger(), 
    //   inputArry: [0,0,0,0,0,0,0,0],
    //   won: false
    // }, ()=>{
    //   this.setState({solutionArray:this.findSolution(this.state.number)})
    // })
    this.props.history.push({pathname:`/`})
  }
  render() {
        return (this.state.dead? <div>You are dead.</div>:<div className="aboutMeContainer">
           <div>Timer:</div>
           <div className='binaryBox'>
           {this.state.won? this.flashy():null}
           {
             this.state.showPow === 'true'? this.state.inputArry.map((_,ind)=>{
               return (<div className='binary'>{Math.pow(2,this.state.inputArry.length - ind -1)}</div>)
              }):null
           }
           </div>
           {
            this.state.grid.map((el, rowIndex)=>{
                if(this.state.selectedRow == rowIndex){
                    return(<div key={rowIndex} className='binaryBoxSelected'>
                        
                     {  
                            el.map((el, colIndex)=>{
                             return (
                                 
                                 <div className='binarySelected' key={colIndex} data-id={[colIndex,rowIndex]}>{el}</div>
                                 
                                 
                             )
                           }
                          )
                } </div>)
            }else{
                    return(<div key={rowIndex} className='binaryBox'>
                 {  
                        el.map((el, colIndex)=>{
                         return (
                             
                             <div className='binary' key={colIndex} data-id={[colIndex,rowIndex]}>{el}</div>
                             
                         )
                       })
                }</div>)
           }
        })
    }
           <div>guess here: <input type='text' onChange={this.guessChange} value={this.state.guess}/><button onClick={this.checkRow}>submit guess</button></div>
           {
             this.state.won?
             <div onClick={this.playAgain}><button>You won!Play again?</button ></div>
             :null
           }
        </div>)
            
  }
}

