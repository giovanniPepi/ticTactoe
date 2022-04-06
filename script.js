// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");
  
  //sets the sign for each player
  xSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(xSelector.textContent);
    game.AIplayer.setSign(oSelector.textContent);

  //debugging
/*     console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign()); */
  });
  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(oSelector.textContent);
    game.AIplayer.setSign(xSelector.textContent);

          //debugging
/*     console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign()); */
  })

  //listen for clicks on the gameboard array and sets the sign/CSS on them
  gameUnitContainer.forEach((unit) => 
    unit.addEventListener('click', () => {

      //only play one round;
      if (game.humanPlayer.getPlayStatus() !== true) return;

      //avoids overwritting
      if (unit.firstChild.textContent !== '') return;

      game.setUnit((unit.dataset.array), game.humanPlayer.getSign());
      unit.firstChild.textContent = game.humanPlayer.getSign();
      unit.firstChild.setAttribute("class", `gameUnit gameUnit${game.humanPlayer.getSign()}`);
      game.humanPlayer.setPlayStatus(false);
              //debugging
/*               console.log(game.getBoard());
 */      
      // simulate a hesitating machine...
      setTimeout(function(){
        //avoids infinite recursion
        if(game.getGameboardLength() >= 8) return;
        else simulateAIPlay();
    }, (game.myRandom()*350));
  })
);

  const updateBoard = () => {
    // debugging
  /*   console.log(game.getBoard()); */
    gameArray = game.getBoard();
    for (let i = 0; i < 9; i++){
      let toWrite = document.querySelector(`[data-array="${i}"]`);
      toWrite.firstChild.setAttribute("class", `gameUnit gameUnit${gameArray[i]}`);
      toWrite.firstChild.textContent = gameArray[i];
    }
  }
  
  return {
    gameUnitContainer, gameUnit, updateBoard,
  }
})();

// constructs a player;
const Player = () => {
  let _sign;
  let _name;
  let _currentlyPlaying = true;
  let _winningStatus = false; 
  
  const setName = (name) => _name = name;
  const setSign = (sign) => {
    caps = sign.toUpperCase();
    if (caps === 'X' || caps === "O") _sign = caps;
    else console.log('invalid sign');
  };
  const getSign = () => _sign;
  const getName = () => _name;
  const reset = () => {
    _sign = '';
    _name = '';
  };
  const setPlayStatus = () => {
    _currentlyPlaying ? _currentlyPlaying = false : _currentlyPlaying = true;
  }
  const getPlayStatus = () =>  _currentlyPlaying;
  const setWinner = () => _winningStatus = true;
  const isWinner = () => _winningStatus;

  return {
    setSign, getSign, reset, setName, getName, getPlayStatus, 
    setPlayStatus, isWinner, setWinner,
  }; 
}

//handles game logic
const game = (function() {
  let _gameboard = new Array(9);
  let _whoPlaysNow = '';
  let myRandom = () => {
    // *9 to avoid returning position higher than 8
    return (Math.floor(Math.random()*9));
  }

  // instantiate player / AI
  const humanPlayer = Player();
  const AIplayer = Player();

  const whoPlaysNow = () => {
    if (humanPlayer.getPlayStatus()) {
     humanPlayer.setPlayStatus = false;
     _whoPlaysNow = 'humanPlayer';
     return 'humanPlayer';
    }
    else if (AIplayer.getPlayStatus()) {     
      AIplayer.setPlayStatus = false;
      _whoPlaysNow = 'AIplayer';
      return 'AIplayer';
    }
   }

  const setUnit = (position, sign) =>{
    // avoids overwritting
    if (_gameboard[position] !== undefined) return;
    _gameboard[position] = sign;
    //before proceding back
    if(game.validateWinner(_gameboard.indexOf(sign), sign)) setWinner(sign);
  };
  const getUnit = (position) => {/* 
    console.log(_gameboard[position]); */
    return _gameboard[position];
  }
  const getBoard = () => _gameboard;
  const resetBoard = () => {
    _gameboard = new Array(9);
  };
  const getRound = () => {
    console.log(humanPlayer.getSign(), AIplayer.getSign());
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
    humanPlayer.getSign() === sign? console.log(humanPlayer.getSign() + ' has won') : console.log(AIplayer.getSign() + ' has won');
  }

  return {
      setUnit, getUnit, resetBoard, humanPlayer, AIplayer, getBoard,
      getRound, whoPlaysNow, myRandom, getGameboardLength, validateWinner, 
      setWinner,
    }
})();

// simulating AI play to test the game
simulateAIPlay = function() {
  
  let AIturn = game.myRandom();
  board = game.getBoard;
  
  // avoids overwritting
  if(game.getUnit(AIturn) === undefined) {
    game.setUnit(AIturn, game.AIplayer.getSign());
    dQuery.updateBoard();
    game.AIplayer.setPlayStatus(false);
    game.humanPlayer.setPlayStatus(true);

  } else simulateAIPlay();
};


