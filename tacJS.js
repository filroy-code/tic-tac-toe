let x = 1
let winningArrays = {
    1: ["0", "1", "2"],
    2: ["0", "3", "6"],
    3: ["0", "4", "8"],
    4: ["3", "4", "5"],
    5: ["6", "7", "8"],
    6: ["1", "4", "7"],
    7: ["2", "5", "8"],
    8: ["2", "4", "6"],
}

let winner

const scoreboard = {
xSelections: [],
oSelections: [],
}

let board = createBoard()

let tiles = document.querySelectorAll(".tile")
let turnDisplay = document.getElementById("turnDisplay")

let turn = playerTurn()
play()


/* const playerMaker = (symbolChoice) => {
    switch (symbolChoice) {
        case 'X': 
    }
} */

function createBoard() {
    let top = [0, 1, 2];
    let middle = [3, 4, 5]
    let bottom = [6, 7, 8]

    row1 = document.createElement('div')
    row2 = document.createElement('div')
    row3 = document.createElement('div')
    row1.classList.add("row")
    row2.classList.add("row")
    row3.classList.add("row")

    for (place in top) {
        let p = place
        place = document.createElement('div')
        place.classList.add('tile')
        place.setAttribute('id', `${top[p]}`)
        row1.appendChild(place)
    }

    for (place in middle) {
        let p = place
        place = document.createElement('div')
        place.classList.add('tile')
        place.setAttribute('id', `${middle[p]}`)
        row2.appendChild(place)
    }

    for (place in bottom) {
        let p = place
        place = document.createElement('div')
        place.classList.add('tile')
        place.setAttribute('id', `${bottom[p]}`)
        row3.appendChild(place)
    }
    gameBoard.appendChild(row1)
    gameBoard.appendChild(row2)
    gameBoard.appendChild(row3)

    return {top, middle, bottom}
}

function playerTurn() {
    switch(x) {
        case 1:
            selector = "X";
            break;
        case 0:
            selector = "O"
            break
    }
    turnDisplay.innerHTML = `Player turn: ${selector}`
    return selector
}

function winCheck() {
    for (counter in scoreboard) {
        // console.log(scoreboard[counter])
        for (key in winningArrays) {
            test = winningArrays[key]
            const containsAll = test.every(i => scoreboard[counter].includes(i));
            if (containsAll === true) {
                console.log(key)
                switch(counter) {
                    case 'xSelections': winner = 'X'
                    winUpdate()
                    break;
                    case 'oSelections': winner = 'O'
                    winUpdate()
                    break;
                }
            }
            // console.log(containsAll)
        }
        //const containsAll = winningArrays.every(i => scoreboard[counter].includes(i));
        // console.log(scoreboard[counter])
        // console.log(containsAll)
    }
}

function play() {
    tiles.forEach((tile) => {
        tile.addEventListener('click', (e) => {
            tile.innerHTML = selector
            switch(x) {
                case 1: scoreboard.xSelections.push(e.target.id);
                break;
                case 0: scoreboard.oSelections.push(e.target.id);
                break;
            }
            switch (x) {
                case 1: x = 0;
                break;
                case 0: x = 1
                break;
            }
            playerTurn()
            winCheck()
        })
    })}

function winUpdate() {
    if (winner === 'X') {
        turnDisplay.innerHTML = "X wins the game!"
    } else if (winner === 'O') {
        turnDisplay.innerHTML = "O wins the game!"
    }
}

function reset() {
    x = 1;
    winner = null;
    scoreboard.xSelections = [];
    scoreboard.oSelections = [];
    playerTurn()
}

resetButton = document.getElementById('resetButton')

resetButton.addEventListener('click', () => {
    reset();
    theTiles = document.querySelectorAll('.tile')
    theTiles.forEach((theTile) => {
        theTile.innerHTML = ""
    }
)})