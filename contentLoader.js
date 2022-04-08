const placar = (xWin, drawTimes, oWin) => {
  // subtract height to stay at the same position
  const header = document.querySelector('.header');
  header.style.height = '23.5vh';

  const placar = document.querySelector(".placar");

  placar.style.display = 'flex';
  placar.style.justifyContent = 'space-between';
  placar.style.marginLeft = '3vw';
  placar.style.marginRight = '3vw';  
  placar.style.marginBottom = '4vh';
  placar.style.marginTop = '4vh';
  placar.style.background = 'orange';


  const xPlacar = document.createElement('div');
  xPlacar.textContent = 'X: 12 wins';

  const oPlacar = document.createElement('div');
  oPlacar.textContent = 'O: 12 wins';

  const drawPlacar = document.createElement('div');
  drawPlacar.textContent = 'Draw: 2 times';

  placar.appendChild(xPlacar);
  placar.appendChild(drawPlacar);
  placar.appendChild(oPlacar);
  
}
