// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");
  const reset = document.querySelector(".reset");
  const roundSelection = document.querySelectorAll(".roundSelection");
  const header = document.querySelector(".header");
  
  //sets the sign for both, updates header
  xSelector.addEventListener("click", () => {
    if(game.humanPlayer.getSign() === undefined) {
      game.humanPlayer.setSign(xSelector.textContent);
      game.cpuPlayer.setSign(oSelector.textContent);
      roundSelection.forEach(child => header.removeChild(child));
      setPlacar(0, 0, 0, 'X');
    }
  });

  oSelector.addEventListener("click", () => {
    if(game.humanPlayer.getSign() === undefined) {
      game.humanPlayer.setSign(oSelector.textContent);
      game.cpuPlayer.setSign(xSelector.textContent);
      roundSelection.forEach(child => header.removeChild(child));
      setPlacar(0, 0, 0, 'O');
    }
  })

  reset.addEventListener('click', () => window.location.reload());

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
  let _winCount = 0;

  const setSign = (sign) => {
    //sanitizer, just in case
    if (sign === 'X' || sign === "O") _sign = sign;
  };

  const setWinCount = () => _winCount++;

  const setPlayStatus = (stats) => _currentlyPlaying = stats;

  const getPlayStatus = () =>  _currentlyPlaying;

  const getSign = () => _sign;

  const getWinCount = () => _winCount;

  return {
    setSign, getSign, getPlayStatus, 
    setPlayStatus, setWinCount, getWinCount,
  }; 
}

//handles game logic
const game = (function() {

  let _gameboard = new Array(9);
  let _gameOn = true;
  let _drawCount = 0;

  //players
  const humanPlayer = Player();

  humanPlayer.setPlayStatus(true);

  const cpuPlayer = Player();
  
  const setUnit = (position, sign) => _gameboard[position] = sign;  

  const setDraw = () => {
    _drawCount++;
    alert('It\'s a draw! Total draw times: ' + _drawCount);
    resetGame();
  }

  const getDraw = () => _drawCount;

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
      humanPlayer.setWinCount();
      alert(humanPlayer.getSign() + ' has won! Total wins: ' + humanPlayer.getWinCount() + ' times');
      resetGame();

    } else if (cpuPlayer.getSign() === sign) {
      cpuPlayer.setWinCount();
      alert(cpuPlayer.getSign() + ' has won! Total wins: ' + humanPlayer.getWinCount() + ' times');
        resetGame();
      };
  };

  const resetGame = () => {
    
    const sanitizePlacarInput = (() => {
      if (humanPlayer.getSign() === 'X') setPlacar(humanPlayer.getWinCount(), getDraw(), cpuPlayer.getWinCount(), humanPlayer.getSign());
      else if (humanPlayer.getSign() === 'O') setPlacar(cpuPlayer.getWinCount(), getDraw(), humanPlayer.getWinCount(), humanPlayer.getSign());
      else console.log('ferrou');
    })();
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
      getGameboardLength, getGameStats, getDraw,
    }

})();

// simulating AI play to test the game
const cpuPlay = function() {

  // doesn't play if it's not suposed to
   if(!game.cpuPlayer.getPlayStatus()) return;

  // *9 to return valid positions
  let myRandom = () => rand = (Math.floor(Math.random()*9));
  
  let cpuTurn = myRandom();

  // play until valid 
  while (game.getUnit(cpuTurn) !== undefined) {
    cpuTurn = myRandom();
  };
  game.evaluateRound(parseInt(cpuTurn), game.cpuPlayer.getSign()); 
}



