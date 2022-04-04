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
    game.humanPlayer.setPlayStatus(true);
          //debugging
    console.log('Human: ', game.humanPlayer.getSign());
    console.log('PC: ', game.AIplayer.getSign());
  });
  oSelector.addEventListener("click", () => {
    game.humanPlayer.setSign(oSelector.textContent);
    game.AIplayer.setSign(xSelector.textContent);
          //debugging
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
  let _currentlyPlaying = false;
  
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

  const setPlayStatus = (stats) => {
    _currentlyPlaying = stats;
  }
  const getPlayStatus = _currentlyPlaying;

  return {
    setSign, getSign, reset, setName, getName, getPlayStatus, setPlayStatus,
  }; 
}

//handles game logic
const game = (function() {
  const _gameboard = new Array(9);

  // instantiate player / AI
  const humanPlayer = Player();
  const AIplayer = Player();

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
  const getRound = () => {
    console.log(humanPlayer.getSign(), AIplayer.getSign());
  }

  return {
      setUnit, getUnit, resetBoard, humanPlayer, AIplayer, getBoard, getRound,
    }
})();









