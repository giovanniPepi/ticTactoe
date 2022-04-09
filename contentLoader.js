const getPlacar = (xWin, drawTimes, oWin) => {
  // subtract height to stay at the same position
  const header = document.querySelector('.header');
  header.style.height = '0vh';

  const placar = document.querySelector(".placar");

  placar.style.display = 'flex';
  placar.style.justifyContent = 'space-around';
  placar.style.alignItems = "center";
  placar.style.height = "27vh";
  placar.style.background = '#FBBF24';
  
  const xPlacar = document.createElement('div');
  xPlacar.style.color = 'transparent';
  xPlacar.style.textShadow = '0 0 0 #EF4444';
  if (xWin === 0) xPlacar.textContent = `❌ `;
  else xPlacar.textContent = `❌:  ${xWin} wins`;

  const oPlacar = document.createElement('div');
  oPlacar.style.color = 'transparent';
  oPlacar.style.textShadow = '0 0 0 #0EA5E9';
  if (oWin === 0) oPlacar.textContent = `⭕ `;
  else oPlacar.textContent = `⭕: ${oWin} wins`

  const drawPlacar = document.createElement('div');
  drawPlacar.style.color = 'transparent';
  drawPlacar.style.textShadow = '0 0 0 #65A30D';  
  if (drawTimes !== 0) drawPlacar.textContent = `Draw: ${drawTimes} times`;

  placar.appendChild(xPlacar);
  placar.appendChild(drawPlacar);
  placar.appendChild(oPlacar);

}
