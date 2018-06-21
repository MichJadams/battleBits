

const randomInteger = (highestNum) => {
  return Math.floor(Math.random() * Math.pow(highestNum, 2))
}

const findSolution = (decimalNumber) => {
  let binary = decimalNumber.toString(2).padStart(8, "0").split("")
  return binary
}



module.exports = {
  randomInteger,
  findSolution
}