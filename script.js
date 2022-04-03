    // handles DOM manipulation
    dQuery = (function(){
        const gameboard = document.querySelector(".gameboard");
        const gameUnit = document.querySelectorAll(".gameUnit");

        // writes plays according to their info
        writeUnit = (element, arg) => {
            element.textContent = arg;
            if (arg === 'X') {
                element.setAttribute("class", "gameUnitX");
            } else if (arg === 'O') {
                element.setAttribute("class", "gameUnitO");
            }
        };

        return {
            gameboard, gameUnit,
        }
    // imediatelly calls it before listeners
    })();

    const getListeners = (() => {
        /*Listens for clicks, pass ID and calls write 
        function for the element clicked */
        dQuery.gameUnit.forEach((unit) => 
            unit.addEventListener("click", () => {
                console.log(unit.id);
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


