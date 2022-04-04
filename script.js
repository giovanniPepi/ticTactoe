// handles DOM manipulation
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  
  return {
    gameboard, gameUnitContainer, gameUnit,
  }
})();

//handles game logic
const game = (() => {
  const _gameboard = new Array(9);
  const setUnit = (position, sign) =>{
    _gameboard[position] = sign;
  };

  const getUnit = (position) => {
    return _gameboard[position];
  }
  const resetBoard = () => {
    for (i = 0; i < _gameboard.length; i++) {
      _gameboard[i] = '';
    }
  };

  return {
    setUnit, 
    getUnit,
    resetBoard,
    }
})();

const Player = () => {

  
}





// function that holds player info;



