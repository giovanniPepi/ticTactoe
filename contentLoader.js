const placar = (xWin, drawTimes, oWin) => {
  // subtract height to stay at the same position
  const header = document.querySelector('.header');
  header.style.height = '18.5vh';

  const placar = document.querySelector(".placar");

  placar.style.display = 'flex';
  placar.style.justifyContent = 'space-between';
  placar.style.marginLeft = '3vw';
  placar.style.marginRight = '3vw';  
  placar.style.marginBottom = '4vh';
  placar.style.marginTop = '4vh';
  placar.style.background = '#FBBF24';
  
  const xPlacar = document.createElement('div');
  xPlacar.style.color = 'transparent';
  xPlacar.style.textShadow = '0 0 0 #EF4444';
  xPlacar.textContent = `❌: ${xWin} wins`

  const oPlacar = document.createElement('div');
  oPlacar.style.color = 'transparent';
  oPlacar.style.textShadow = '0 0 0 #0EA5E9';
  oPlacar.textContent = `⭕: ${oWin} wins`

  const drawPlacar = document.createElement('div');
  drawPlacar.style.color = 'transparent';
  drawPlacar.style.textShadow = '0 0 0 #65A30D';  
  drawPlacar.textContent = `Draw: ${drawTimes} times`

  placar.appendChild(xPlacar);
  placar.appendChild(drawPlacar);
  placar.appendChild(oPlacar);

}
