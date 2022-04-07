// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");
  
  //sets the sign for each player
  xSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(xSelector.textContent);
    game.cpuPlayer.setSign(oSelector.textContent);
  });
  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(oSelector.textContent);
    game.cpuPlayer.setSign(xSelector.textContent);
  })

  //listen for clicks on the gameboard array and sets the sign/CSS on them
  gameUnitContainer.forEach((unit) => 
    unit.addEventListener('click', () => {
      //only play one round;
      if (!game.humanPlayer.getPlayStatus()) return;

      //avoids overwritting
      if (unit.firstChild.textContent !== '') return;
      let sign = game.humanPlayer.getSign();
      unit.firstChild.textContent = sign;
      unit.firstChild.setAttribute("class", `gameUnit gameUnit${sign}`);
      game.play((unit.dataset.array), sign);
  })
);

  const updateBoardCSS = () => {
    // debugging
  /*   console.log(game.getBoard()); */
    gameArray = game.getBoard();
    for (let i = 0; i < 9; i++){
      let toWrite = document.querySelector(`[data-array="${i}"]`);
      toWrite.firstChild.setAttribute("class", `gameUnit gameUnit${gameArray[i]}`);
      toWrite.firstChild.textContent = gameArray[i];
    }
  };

  const resetBoardCSS = () => {
    for (let i = 0; i < 9; i++){
      let b = document.querySelector(`[data-array="${i}"]`);
      b.firstChild.setAttribute("class", "gameUnit");
      b.firstChild.textContent = '';
    }
  } 
  
  return {
    gameUnitContainer, gameUnit, updateBoardCSS, resetBoardCSS,
  }
})();

// constructs a player;
const Player = () => {
  let _sign;
  let _currentlyPlaying = false;
  let _winningStatus = false; 

  const setSign = (sign) => {
    caps = sign.toUpperCase();
    if (caps === 'X' || caps === "O") _sign = caps;
    else console.log('invalid sign');
  };
  const getSign = () => _sign;
  const reset = () => {
    _sign = '';
    _name = '';
  };
  const setPlayStatus = () => {
    _currentlyPlaying? _currentlyPlaying = false : _currentlyPlaying = true;
  }
  const getPlayStatus = () =>  _currentlyPlaying;
  const setWinner = (status) => _winningStatus = status;
  const isWinner = () => _winningStatus;

  return {
    setSign, getSign, reset, getPlayStatus, 
    setPlayStatus, isWinner, setWinner,
  }; 
}

//handles game logic
const game = (function() {
  let _gameboard = new Array(9);
  let _gameOn = true;


  // instantiate player / AI
  const humanPlayer = Player();
  const cpuPlayer = Player();

  const getGameStats = () => _gameOn;

  const setUnit = (position, sign) =>{
    // avoids overwritting non empty array
    if (_gameboard[position] !== undefined) return;
    _gameboard[position] = sign;
  };  

  const play = (position, sign) => {
    //debug
    console.log('notgamestats: ', game.getGameStats(), 'not playstats', !humanPlayer.getPlayStatus());
    if (!game.getGameStats() || !humanPlayer.getPlayStatus()) return;      
    setUnit(position, sign)
    // update before proceding back
    dQuery.updateBoardCSS();
    if(game.validateWinner(_gameboard.indexOf(sign), sign)) setWinner(sign);
    humanPlayer.setPlayStatus(false);
    cpuPlayer.setPlayStatus(true);
  }

  const getUnit = (position) => {/* 
    console.log(_gameboard[position]); */
    return _gameboard[position];
  };

  const getBoard = () => _gameboard;

  const resetBoardArray = () => {
    _gameboard = new Array(9);
  };

  const getRound = () => {
    console.log(humanPlayer.getSign(), cpuPlayer.getSign());
  }

  // gets gameboard length
  const getGameboardLength = () => {
    let count = [];
    readArray = game.getBoard();
    readArray.forEach((array => {
      count.push(array);
    }))
    return (count.length);
  };

  // check winning conditions after every round 
  const validateWinner = (index, sign) => {
    // combinations of indexes for each sign that result in a win
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
    .filter((combination) => combination.includes(index))
    // some checks the array and return true if the item contains the winning index
    // every returns true if every combination found on the array matches the winning array 
    .some((possibleCombination) => possibleCombination.every((index) => game.getUnit(index) === sign));  
  }

  const setWinner = (sign) => {
    _gameOn = false;
    if (humanPlayer.getSign() === sign) {
      alert(humanPlayer.getSign() + ' has won');
      resetGame();
    } else if (cpuPlayer.getSign() === sign) {
        alert(cpuPlayer.getSign() + ' has won');
        resetGame();
      } else console.log ('Something\'s wrong, I can feel it');
  };

  const evaluate = (player) => {
    console.log('current game state: ' + getGameStats());
    console.log('current play stats: '+ player.getPlayStatus());
    console.log('is winner? ' + player.isWinner());


  }
  evaluate(humanPlayer);
  evaluate(cpuPlayer);

  const resetGame = () => {
    resetBoardArray();
    dQuery.resetBoardCSS();
    _gameOn = true;
    humanPlayer.setWinner(false); 
    cpuPlayer.setWinner(false);
    humanPlayer.setPlayStatus(); 
  };



  return {
      play, setUnit, getUnit, resetBoardArray, humanPlayer, cpuPlayer, getBoard,
      getRound, getGameboardLength, validateWinner, 
      setWinner, getGameStats, resetGame, evaluate,
    }
})();

// simulating AI play to test the game
cpuPlay = function() {

  let myRandom = () => {
    // *9 to avoid returning position higher than 8
    return (Math.floor(Math.random()*9));
  }  

  //avoids infinite recursion
  if(game.getGameboardLength() >= 8) return;

  if(!game.cpuPlayer.getPlayStatus()) return;
  let AIturn = myRandom();
  board = game.getBoard();

  // avoids overwritting
  if(game.getUnit(AIturn) === undefined) {
    game.setUnit(AIturn, game.cpuPlayer.getSign());
    dQuery.updateBoardCSS();
    game.cpuPlayer.setPlayStatus(false);
    game.humanPlayer.setPlayStatus(true);
  } else cpuPlay();
};


