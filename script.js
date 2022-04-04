// handles DOM manipulation
const dQuery = (function(){
  const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
  const gameUnit = document.querySelectorAll(".gameUnit");
  
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
    console.log({caps});
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
  const humanPlayer = Player();
  humanPlayer.setName('fucker');
  humanPlayer.setSign('X');
  const AIplayer = Player();
  humanPlayer.getSign()==='O'? AIplayer.setSign('X'):AIplayer.setSign('O');

  return {
      setUnit, getUnit, resetBoard, humanPlayer, AIplayer,
    }
})();









