main = (() => {
    
// handles DOM manipulation
    const dQuery = (function(){
        const gameboard = document.querySelector(".gameboard");
        const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
        const gameUnit = document.querySelectorAll(".gameUnit");

        // writes plays according to their info
        const writeUnit = (element, arg) => {
            element.textContent = arg;
            if (arg === 'X') {
                element.setAttribute("id", "gameUnitX");
            } else if (arg === 'O') {
                element.setAttribute("id", "gameUnitO");
            }
        };
        return {
            gameboard, gameUnitContainer, gameUnit, writeUnit, 
        }
// imediatelly calls it before listeners
    })();
    const getListeners = (() => {
        /*Listens for clicks on parent node, pass ID of child and calls write 
        function */
        dQuery.gameUnitContainer.forEach((unit) => 
            unit.addEventListener("click", () => {
                // exits if already played;
                if (unit.textContent !== '') return;
                gameUnit = unit.firstChild;
                currentPlay = game.changeTurn();
                dQuery.writeUnit(gameUnit, currentPlay);
            })
        );   
    })();

//defines game logic
    const game = (() => {
        // will be changed each round
        let currentPlay = 'O';
        const changeTurn = () => {
            return currentPlay === 'X'? currentPlay = 'O' : currentPlay = 'X';
        }
        return {
            changeTurn, currentPlay,
        }
    })();



})();


