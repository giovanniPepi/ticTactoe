const setPlacar = (xWin, tieTimes, oWin, choice) => {

  // subtract height to stay at the same position
  const header = document.querySelector('.header');
  header.style.height = '0vh';

  const placar = document.querySelector(".placar");

  placar.style.display = 'flex';
  placar.style.justifyContent = 'center';
  placar.style.alignItems = "center";
  placar.style.height = "19vh";
  placar.style.gap = "3rem";
  placar.style.fontSize = '1.3rem';

  // delete current if exists
  const testExisting = (() => {
    const _items = document.querySelectorAll(".placarItem");
    if (_items.length > 0) _items.forEach(item => placar.removeChild(item));
  })();

  const xPlacar = document.createElement('div');
  const xPlacarIcon = document.createElement('div');
  const xPlacarScore = document.createElement('div');
  
  xPlacar.setAttribute("class", "placarItem");
  xPlacar.style.color = 'transparent';
  xPlacar.style.textShadow = '0 0 0 #EF4444';
  xPlacar.style.display = 'flex';
  xPlacar.style.flexDirection = 'column';
  xPlacar.style.gap = '1rem';
  xPlacar.style.justifyContent = 'center';
  xPlacar.style.textAlign = 'center';
  xPlacar.style.padding = '.5rem';;
  xPlacar.style.borderRadius = "1rem";
  if (choice == 'X') xPlacar.style.background = '#FECACA';
  xPlacarIcon.textContent = `❌ `;
  if (xWin === 0) xPlacarScore.textContent = '';
  else if (xWin === 1) xPlacarScore.textContent = `${xWin} win`;
  else if (xWin > 1) xPlacarScore.textContent = `${xWin} wins`;

  xPlacar.appendChild(xPlacarIcon);
  xPlacar.appendChild(xPlacarScore);
  
  const oPlacar = document.createElement('div');
  const oPlacarIcon = document.createElement('div');
  const oPlacarScore = document.createElement('div');
  oPlacar.setAttribute("class", "placarItem");
  oPlacar.style.color = 'transparent';
  oPlacar.style.textShadow = '0 0 0 #0EA5E9';
  oPlacar.style.display = 'flex';
  oPlacar.style.flexDirection = 'column';
  oPlacar.style.gap = '1rem';
  oPlacar.style.justifyContent = 'center';
  oPlacar.style.textAlign = 'center';
  oPlacar.style.padding = '.5rem';;
  oPlacar.style.borderRadius = "1rem";
  if (choice == 'O') oPlacar.style.background = "#BAE6FD";
  oPlacarIcon.textContent = `⭕ `;
  if (oWin === 0) oPlacarScore.textContent = '';
  else if (oWin === 1) oPlacarScore.textContent = `${oWin} win`;
  else if (oWin > 1) oPlacarScore.textContent = `${oWin} wins`;
  
  oPlacar.appendChild(oPlacarIcon);
  oPlacar.appendChild(oPlacarScore); 

  const tiePlacar = document.createElement('div');
  const tiePlacarIcon = document.createElement('div');
  const tiePlacarScore = document.createElement('div');
  tiePlacar.setAttribute("class", "placarItem");
  tiePlacar.style.color = 'transparent';
  tiePlacar.style.textShadow = '0 0 0 #65A30D';  
  tiePlacar.style.display = 'flex';
  tiePlacar.style.flexDirection = 'column';
  tiePlacar.style.gap = '1rem';
  tiePlacar.style.justifyContent = 'center';
  tiePlacar.style.textAlign = 'center';
  if (tieTimes !== 0) {
    tiePlacarIcon.textContent = `Tie `;
    if (tieTimes ===1) tiePlacarScore.textContent = `${tieTimes} time`;
    else if (tieTimes > 1) tiePlacarScore.textContent = `${tieTimes} times`;      
  }
  tiePlacar.appendChild(tiePlacarIcon);
  tiePlacar.appendChild(tiePlacarScore);

  placar.appendChild(xPlacar);
  placar.appendChild(tiePlacar);
  placar.appendChild(oPlacar);

}
