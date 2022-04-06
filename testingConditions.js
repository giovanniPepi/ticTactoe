const test = (() => {
  let winCount = [];     
  
  getTestPlay = (play, sign) => {
      switch(play) {
        case 0: 
        game.setUnit(0, sign);
        game.setUnit(4, sign);
        game.setUnit(8, sign);
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');
              break;
            }
          } 
        game.resetBoard();
        break;
        case 1:
          game.setUnit(2, sign);
          game.setUnit(4, sign);
          game.setUnit(6, sign);
          
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 2:
        game.setUnit(0, sign);
        game.setUnit(1, sign);
        game.setUnit(2, sign);      
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 3:
          game.setUnit(3, sign);
          game.setUnit(4, sign);
          game.setUnit(5, sign);
          
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 4:
          game.setUnit(6, sign);
          game.setUnit(7, sign);
          game.setUnit(8, sign);
          
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 5:
          game.setUnit(8, sign);
          game.setUnit(5, sign);
          game.setUnit(2, sign);
          
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 6:
          game.setUnit(7, sign);
          game.setUnit(4, sign);
          game.setUnit(1, sign);
          
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 7:
          game.setUnit(6, sign);
          game.setUnit(3, sign);
          game.setUnit(0, sign);
          
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;        
      }    
  }

  const testX = () => {
    console.log('Expecting 8 wins: ');
    for (let i = 0; i < game.getBoard().length; i++) {
      getTestPlay(i, 'X');
    }      
    console.log('Total wins: ', winCount.length);
    //resets array before next test
    winCount = [];
  }
  const testO = () => {
    console.log('Expecting 8 wins: ');
    for (let i = 0; i < game.getBoard().length; i++) {
      getTestPlay(i, 'O');
    }      
    console.log('Total wins: ', winCount.length);
    //resets array before next test
    winCount = [];
  }
  return {
    testO, testX,
  }

})();



