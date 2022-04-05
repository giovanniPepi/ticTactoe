const test = (() => {
  let winCount = [];     
  
  getTestPlay = (play, sign) => {

      switch(play) {
        case 1: 
        game.setUnit(0, sign);
        game.setUnit(4, sign);
          game.setUnit(8, sign);
          dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');
              break;
            }
          } 
          game.resetBoard();
        break;
        case 2:
          game.setUnit(2, sign);
          game.setUnit(4, sign);
          game.setUnit(6, sign);
          dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 3:
        game.setUnit(0, sign);
        game.setUnit(1, sign);
        game.setUnit(2, sign);
        dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 4:
          game.setUnit(3, sign);
          game.setUnit(4, sign);
          game.setUnit(5, sign);
          dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 5:
          game.setUnit(6, sign);
          game.setUnit(7, sign);
          game.setUnit(8, sign);
          dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 6:
          game.setUnit(8, sign);
          game.setUnit(5, sign);
          game.setUnit(2, sign);
          dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 7:
          game.setUnit(7, sign);
          game.setUnit(4, sign);
          game.setUnit(1, sign);
          dQuery.updateBoard();
          for (let i = 0; i < game.getBoard().length; i++){
            if (game.checkWinner(i, sign) === true){
              winCount.push(',');;
              break;
            }
          } 
          game.resetBoard();
        break;
        case 8:
          game.setUnit(6, sign);
          game.setUnit(3, sign);
          game.setUnit(0, sign);
          dQuery.updateBoard();
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
  console.log('Testing 8 possible winning moves for X: '); 
  for (let i = 0; i < game.getBoard().length; i++) {
    getTestPlay(i, 'X');
  }
  console.log(winCount.length);

  return {
    getTestPlay,  
  }
})