    // handles DOM manipulation
    dQuery = (function(){
        const gameboard = document.querySelector(".gameboard");
        const gameUnit = document.querySelectorAll(".gameUnit");

        // writes plays
        writeUnit = (element, arg) => {
            element.textContent = arg;
        };

        return {
            gameboard, gameUnit,
        }
    // imediatelly calls it before listeners
    })();

    const getListeners = (() => {
        let currentPlay = 'X';

        /*Listens for clicks, pass ID and calls write 
        function for the element clicked */
        dQuery.gameUnit.forEach((unit) => 
            unit.addEventListener("click", () => {
                console.log(unit.id);
                writeUnit(unit, currentPlay);
            })
        );
   
    })();


//activating


