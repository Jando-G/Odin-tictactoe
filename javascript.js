const gameBoard = (() => { 
    const notes = document.querySelectorAll('#board p');
    let display = document.getElementById('winMsg');
    let turnX = 0;
    let gameboard = ["", "", "", "", "", "", "", "", "" ];
    const displayWinner = (winner) => {
        let winMsg;
        let p1 = document.getElementById('player1');
        if(!p1.value)
            p1 = p1.placeholder;
        else
            p1 = p1.value;
        let p2 = document.getElementById('player2');
        if(!p2.value)
            p2 = p2.placeholder;
        else
            p2 = p2.value;
        if(!winner)
            winMsg = ""
        if(winner == "x")
            winMsg = `${p1} Wins!`;
        if(winner == "o")
            winMsg = `${p2} Wins!`;
        display.innerHTML = winMsg;

    };
    const checkWin = () => { //there are def better ways of checking than this
        let winner = "";
        for(let i = 0; i < 3; i++) {
            if(gameboard[i] == gameboard[i+3] && gameboard[i] == gameboard[i+6] && gameboard[i]) {
                winner = gameboard[i];
                break;
            }
        }
        for(let i = 0; i < 8; i+=3) {
            if(winner) break;
            if(gameboard[i] == gameboard[i+1] && gameboard[i] == gameboard[i+2] && gameboard[i]) {
                winner = gameboard[i];
                break;
            }
        }
        if(gameboard[0] == gameboard[4] && gameboard[0] == gameboard[8] && gameboard[0])
            winner = gameboard[0];
        if(gameboard[2] == gameboard[4] && gameboard[2] == gameboard[6] && gameboard[2])
            winner = gameboard[2];
        return winner;
    };
    const resetBoard = () => {
        turnX = 0;

        for(let i = 0; i < gameboard.length; i++) {
            gameboard[i] = "";
            notes[i].innerHTML = "x";
            notes[i].classList.add("hidden");
            display.innerHTML = "";
            notes[i].addEventListener('click', ()=> {
                if(!gameboard[i]) {
                if(turnX % 2 == 0) {
                    notes[i].innerHTML = "x";
                    gameboard[i] = "x";
                }
                else {
                    notes[i].innerHTML = "o";
                    gameboard[i] = "o";
                }
                notes[i].classList.remove("hidden");
                turnX++;
                updateDisplay();
                if(checkWin() || turnX > 8) {
                    displayWinner(checkWin());
                }
            }
            });
        }
    };
    const updateDisplay = () => {
        for(let i = 0; i < gameboard.length; i++) {
          if(!gameboard[i]) {
              if(turnX % 2 == 0)
                notes[i].innerHTML = "x";
              else
                 notes[i].innerHTML = "o";
          }
        }
    };
    return { resetBoard };
})();
const player = () => { 
    
};

document.getElementById('reset').addEventListener('click', (e)=> {
    e.target.value = "Restart Game"
    gameBoard.resetBoard();
});

