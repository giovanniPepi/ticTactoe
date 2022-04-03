    // handles DOM manipulation
    dQuery = (function(){
        const gameboard = document.querySelector(".gameboard");
        // writes plays
        writeUnit = (element, arg) => {
            element.textContent = arg;
        };

        return {
            gameboard, 
        }
    // imediatelly calls it before listeners
    })();

    const getListeners = (() => {
        const gameUnit = document.querySelectorAll(".gameUnit");

        gameUnit.forEach((unit) => 
            unit.addEventListener("click", () => console.log('test'))
        );

    return {
        gameUnit,
    }
    
    })();


//activating


