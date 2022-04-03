    // handles DOM manipulation
    dQuery = (function(){
        const gameboard = document.querySelector(".gameboard");
        // writes plays
        writeUnit = (element, arg) => {
            element.textContent = arg;
        };
        getGrid = (function() {
            // loops to create the game board;                
            gridCreator = (a) => {
                for (let i = 0; i < 3; i++){
                    let gameUnit = document.createElement("div");
                    gameUnit.style.gridArea= `${a}/${i+1}`;
                    styleSetter(gameUnit);
                };
            }
            // sets CSS style for each square
            styleSetter = (gameUnit) => {
                gameUnit.setAttribute("class", "gameUnit");
                writeUnit(gameUnit, 'fuck');
                gameboard.appendChild(gameUnit);
            };
            
            //calls gridcreator 3x
            for (let i=0; i<3; i++){
                gridCreator(i+1);
            };
        })();

        return {
            gameboard, writeUnit,
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
