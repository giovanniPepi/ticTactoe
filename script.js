    // handles DOM manipulation
    dQuery = (function(){
        const gameboard = document.querySelector(".gameboard");
        const gameUnitContainer = document.querySelectorAll(".gameUnitContainer");
        const gameUnit = document.querySelectorAll(".gameUnit");

        // writes plays according to their info
        writeUnit = (element, arg) => {
            element.textContent = arg;
            if (arg === 'X') {
                element.setAttribute("id", "gameUnitX");
            } else if (arg === 'O') {
                element.setAttribute("id", "gameUnitO");
            }
        };

        return {
            gameboard, gameUnitContainer, gameUnit,
        }
    // imediatelly calls it before listeners
    })();

    const getListeners = (() => {
        /*Listens for clicks, pass ID and calls write 
        function for the element clicked */
        dQuery.gameUnitContainer.forEach((unit) => 
            unit.addEventListener("click", () => {
                unit = unit.firstChild;
                writeUnit(unit, game.currentPlay);
            })
        );   
    })();

    //defines game logic
    const game = (() => {
        // will be changed each round
        let currentPlay = 'O';

        return {
            currentPlay,
        }
    })();



//activating


