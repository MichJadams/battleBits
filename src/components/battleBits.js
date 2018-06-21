import React, { Component } from 'react';
import '../style/battleBits.css';


export default class Play extends Component {
  constructor(props){
    super(props)
    this.state={
      startTime:  false, 
      difficulty: 256, 
      showMod: false,
      number: 0, 
      grid:[[]],
      inputArry: [0,0,0,0,0,0,0,0],
      solutionArray: [],
      won: false,
      guess: 0,
      selectedRow: 3,
    }
    this.randomInteger = this.randomInteger.bind(this)
    this.toggle = this.toggle.bind(this)
    this.findSolution = this.findSolution.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.checkRow = this.checkRow.bind(this)
    this.guessChange = this.guessChange.bind(this)
    this.generateGrid = this.generateGrid.bind(this)
  }
  componentWillMount(){
    console.log("the props",this.props.history.location.State)
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
      for(let i = 0; i < 8; i++){
          let row = this.findSolution(this.randomInteger())
        gridout.push(row)
      }
      return gridout
  }
  randomInteger(){
    return Math.floor(Math.random() * 256)
  }
  findSolution(decimalNumber){
    let binary = decimalNumber.toString(2).padStart(8,"0").split("")
    return binary
  }
  toggle(event){
      console.log("clicked, ",event.currentTarget.dataset)
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
    this.setState({inputArry: copyOfState})
  }
  guessChange(event){
    this.setState({guess:event.target.value})
  }
  checkRow(event){

    //   console.log("CHECKING! this row",this.state.selectedRow, "with this value", this.state.guess)
      let neededNum = parseInt(this.state.grid[this.state.selectedRow].join(''),10)
      let inputNum =  this.state.guess
      console.log("the needed value for this row is", neededNum)
      console.log("the input value in binary is ",this.state.guess.toString(2))
      if(inputNum == neededNum){
          console.log("you are the smartest person alive")
      }
      //write the rest of the game logic here. you goddamn genius. 

  }
  playAgain(){
    this.setState({
      startTime:  false, 
      difficulty: 100, 
      showMod: false,
      number: this.randomInteger(), 
      inputArry: [0,0,0,0,0,0,0,0],
      won: false
    }, ()=>{
      this.setState({solutionArray:this.findSolution(this.state.number)})
    })
  }
  render() {
        return (<div className="aboutMeContainer">
           <div>Timer:</div>
           <div className='binaryBox'>
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

