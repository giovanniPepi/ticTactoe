// handles DOM manipulation
const dQuery = (function(){
    const gameboardContainer = document.querySelector(".gameboardContainer");
    
    getGrid = () => {
        // sets CSS style for each square
        styleSetter = (gameUnit) => {
            gameUnit.setAttribute("class", "gameUnit");
            gameUnit.textContent="fuck";
            gameboardContainer.appendChild(gameUnit);
        };
        // loops to create the game board;                
        gridCreator = (a) => {
            for (let i = 0; i < 3; i++){
                let gameUnit = document.createElement("div");
                gameUnit.style.gridArea= `${a}/${i+1}`;
                styleSetter(gameUnit);
            };
        }
        //calls gridcreator 3x
        for (let i=0; i<3; i++){
            gridCreator(i+1);
        };
    };

})();

getGrid();