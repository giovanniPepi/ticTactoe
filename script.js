// handles DOM manipulation and listeners
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  const xSelector = document.querySelector("#X");
  const oSelector = document.querySelector("#O");

  //sets the sign for each player
  xSelector.addEventListener("click", () => {
    game.humanPlayer.setSign('X');
    game.AIplayer.setSign('O');
          ///temp visualizations
    console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign());
  });
  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign('O');
    game.AIplayer.setSign('X');
          ///temp visualizations
    console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign());
  })

  //listen for clicks on the gameboard array and sets the sign on them
  gameUnitContainer.forEach((unit) => 
    unit.addEventListener('click', () => {
      game.setUnit((unit.dataset.array), game.humanPlayer.getSign())
      if (unit.firstChild.textContent !== '') return;
      unit.firstChild.textContent = game.humanPlayer.getSign();
      unit.firstChild.setAttribute("class", `gameUnit gameUnit${game.humanPlayer.getSign()}`);
        //debugging
      console.log(game.getBoard());
    })
  );
  
  return {
    gameUnitContainer, gameUnit,
  }
})();

// constructs a player;
const Player = () => {
  let _sign;
  let _name;

  const setName = (name) => _name = name;
  const setSign = (sign) => {
    caps = sign.toUpperCase();
    if (caps === 'X' || caps === "O") _sign = caps;
    else console.log('invalid sign');
  }
  const getSign = () => _sign;
  const getName = () => _name;
  const reset = () => {
    _sign = '';
    _name = '';
  };

  return {
    setSign, getSign, reset, setName, getName,
  }; 
}

//handles game logic
const game = (() => {
  const _gameboard = new Array(9);
    
  // instantiate player / AI
  const humanPlayer = Player();
  const AIplayer = Player();

  humanPlayer.setName('ducker');

  const setUnit = (position, sign) =>{
    // avoids overwritting
    if (_gameboard[position] !== undefined) return;
    _gameboard[position] = sign;
  };
  const getUnit = (position) => {
    console.log(_gameboard[position]);
    return _gameboard[position];
  }
  const getBoard = () => _gameboard;
  const resetBoard = () => {
    for (i = 0; i < _gameboard.length; i++) {
      _gameboard[i] = '';
    }
  };
  const setRound = (sign) => {
    humanPlayer.getSign()==='O'? AIplayer.setSign('X'):AIplayer.setSign('O');
  };
  const getRound = () => {
    console.log(humanPlayer.getSign(), AIplayer.getSign());
  }

  return {
      setUnit, getUnit, resetBoard, humanPlayer, AIplayer, getBoard, setRound, getRound,
    }
})();









