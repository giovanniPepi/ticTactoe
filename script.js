// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");
  
  //sets the sign for both 
  xSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(xSelector.textContent);
    game.cpuPlayer.setSign(oSelector.textContent);
  });

  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(oSelector.textContent);
    game.cpuPlayer.setSign(xSelector.textContent);
  })

  // activate game on click
  gameUnitContainer.forEach((unit) => 
    unit.addEventListener('click', () => {

      let block = unit.firstChild;

      //stop until right conditions are met
      if(game.humanPlayer.getSign() === undefined || game.cpuPlayer.getSign() === undefined) return;
      if (!game.humanPlayer.getPlayStatus()) return;
      if (block.textContent !== '') return;

      let sign = game.humanPlayer.getSign();
      block.textContent = sign;
      block.setAttribute("class", `gameUnit gameUnit${sign}`);
      game.evaluateRound(parseInt((unit.dataset.array)), sign);
  })
);

  const updateBoardCSS = () => {

    gameArray = game.getBoard();

    for (let i = 0; i < 9; i++){
      let a = document.querySelector(`[data-array="${i}"]`);
      a.firstChild.setAttribute("class", `gameUnit gameUnit${gameArray[i]}`);
      a.firstChild.textContent = gameArray[i];     
    }
  };

  const resetBoardCSS = () => {
    for (let i = 0; i < 9; i++){
      let b = document.querySelector(`[data-array="${i}"]`);
      b.firstChild.setAttribute("class", "gameUnit");
      b.firstChild.textContent = '';
    }
  } ;
  
  return {
    gameUnitContainer, updateBoardCSS, resetBoardCSS,
  }

})();

// constructor
const Player = () => {
  let _sign;
  let _currentlyPlaying = false;
  let _winningStatus = false; 

  const setSign = (sign) => {
    //sanitizer, just in case
    if (sign === 'X' || sign === "O") _sign = sign;
  };

  const setPlayStatus = (stats) => _currentlyPlaying = stats;

  const getPlayStatus = () =>  _currentlyPlaying;

  const getSign = () => _sign;

  return {
    setSign, getSign, getPlayStatus, 
    setPlayStatus,
  }; 
}

//handles game logic
const game = (function() {

  let _gameboard = new Array(9);
  let _gameOn = true;

  //players
  const humanPlayer = Player();

  humanPlayer.setPlayStatus(true);

  const cpuPlayer = Player();
  
  const setUnit = (position, sign) => _gameboard[position] = sign;  

  const setDraw = () => {
    alert('Draw!');
    resetGame();
  }

  const getGameboardLength = () => {
    let count = [];
    c = game.getBoard();
    c.forEach((array => {
      count.push(array);
    }))
    return (count.length);
  };

  const evaluateRound = (position, sign) => {     
    // stop on boolean
    if (!game.getGameStats()) return;        
    
    //play and update
    setUnit(position, sign);
    dQuery.updateBoardCSS();

    // activate/deactivate players based on current round
    if(humanPlayer.getPlayStatus()){
      humanPlayer.setPlayStatus(false);
      cpuPlayer.setPlayStatus(true);
    } else if (cpuPlayer.getPlayStatus()) {
      cpuPlayer.setPlayStatus(false);
      humanPlayer.setPlayStatus(true);
    } ;

    //verify winner/draw after every play
    if(validateWinner(position, sign)) setWinner(sign);
    if(getGameboardLength() === 9 ) setDraw();

    //calls bot to play
    game.cpuPlayer.getPlayStatus()?   cpuPlay() : false;    
  };

  const validateWinner = (index, sign) => {
    
    // positions that win the game
    const winArray = [
      [0, 4, 8], 
      [2, 4, 6],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [8, 5, 2],
      [7, 4, 1],
      [6, 3, 0],
    ];  

    return winArray
    // returns possible winning conditions
    .filter((comb) => comb.includes(index))
    // some return true if the item contains the winning combination
    // every returns true only if every combination found on the array matches the winning array 
    .some((possibleComb) => possibleComb.every((index) => game.getUnit(index) === sign));  
  }

  const setWinner = (sign) => {

    _gameOn = false;

    cpuPlayer.setPlayStatus(false);

    if (humanPlayer.getSign() === sign) {      
      alert(humanPlayer.getSign() + ' has won');
      resetGame();

    } else if (cpuPlayer.getSign() === sign) {
        alert(cpuPlayer.getSign() + ' has won');
        resetGame();
      };
  };

  const resetGame = () => {
    resetBoardArray();
    dQuery.resetBoardCSS();
    _gameOn = true;
    cpuPlayer.setPlayStatus(false);
    humanPlayer.setPlayStatus(true);
  };

  const getGameStats = () => _gameOn;

  const getUnit = (position) => _gameboard[position];

  const resetBoardArray = () => _gameboard = new Array(9);

  const getBoard = () => _gameboard;

  return {
      evaluateRound, setUnit, getUnit, humanPlayer, cpuPlayer, getBoard,
      getGameboardLength, getGameStats,
    }

})();

// simulating AI play to test the game
const cpuPlay = function() {

  // doesn't play if it's not suposed to
  if (!game.getGameStats()) return; 

  //avoids infinite recursion
  if(game.getGameboardLength() >= 9) return;

  // only play if it's my turn
  if(!game.cpuPlayer.getPlayStatus()) return;

  // *9 to avoid returning position higher than 8
  let myRandom = () => rand = (Math.floor(Math.random()*9));
  
  let cpuTurn = myRandom();
  
  while (game.getUnit(cpuTurn) !== undefined) {
    cpuTurn = myRandom();
  };
  game.evaluateRound(parseInt(cpuTurn), game.cpuPlayer.getSign()); 
}



