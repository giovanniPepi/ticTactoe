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
        for (let i = 1; i < 4; i++){
            let gameUnit = document.createElement("div");
            gameUnit.style.gridArea= `1/${i}`;
            styleSetter(gameUnit);
        
        };        
        for (let i = 1; i < 4; i++){
            let gameUnit = document.createElement("div");
            gameUnit.style.gridArea= `2/${i}`;
            styleSetter(gameUnit);
        };        
        for (let i = 1; i < 4; i++){
            let gameUnit = document.createElement("div");
            gameUnit.style.gridArea= `3/${i}`;
            styleSetter(gameUnit);
        };        
    }

})();

getGrid();