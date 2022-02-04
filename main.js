const cross = Object.assign(new Image(), {
    src: './svg/cross.svg',
    id: 'icon',
    draggable: false
});
const circle = Object.assign(new Image(), {
    src: './svg/circle.svg',
    id: 'icon',
    draggable: false
});
const resetDelay = 1000;
const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let grid = new Array(9).fill('');
let currentPlayer = 'x', lastWinner;
let gameFinished = false;
let rowIndices = [];
for (let index = 0; index < 9; index++) {
    const cell = document.createElement('div');
    document.getElementById('board').appendChild(cell);
    cell.appendChild(new Image());
    cell.id = cell.style.gridArea = `C${index}`;
    cell.className = 'cell';
    cell.addEventListener('mousedown', () => {
        if (grid[index].length > 0 || gameFinished) return;
        grid[index] = currentPlayer;
        currentPlayer = currentPlayer == 'x' ? 'o' : 'x';
        renderToDOM();
    });
}

function renderToDOM() {
    for (let i = 0; i < 9; i++) {
        const cell = document.getElementById(`C${i}`);
        if (cell.childNodes[0])
            cell.removeChild(cell.childNodes[0]);
        if (grid[i] != '')
            cell.appendChild({
                'x': cross,
                'o': circle
            }[grid[i]].cloneNode(false));
    }
    update();
}

function print(value) {
    document.getElementById('output').textContent = value;
}

function checkWin() {
    for (let i = 0; i < 8; i++) {
        const rule = rules[i];
        if (!grid[rule[0]] == ''
            && grid[rule[0]] == grid[rule[1]]
            && grid[rule[1]] == grid[rule[2]]) {
            lastWinner = grid[rule[0]];
            rowIndices = rule;
            return true;
        }
    }
    return false;
}

function checkTie() {
    return grid.every(elem => elem.length > 0);
}

function reset() {
    print('Refreshing...');
    setTimeout(() => {
        gameFinished = false;
        grid = new Array(9).fill('');
        renderToDOM();
        print(null);
    }, resetDelay);
}

function update() {
    if (checkWin()) {
        gameFinished = true;
        currentPlayer = 'x';
        print(`${lastWinner.toUpperCase()} won this round!`);

        /*EXPERIMENTAL*/

        for (let index = 0; index < 9; index++)
            if (!rowIndices.includes(index)) {
                let icon = document.getElementById(`C${index}`).childNodes[0];
                if (icon) icon.style.filter = 'invert(1) brightness(.5)';
            }

        setTimeout(reset, resetDelay);
    } else if (checkTie()) {
        gameFinished = true;
        print('This round is a tie!');
        setTimeout(reset, resetDelay);
    }
}

renderToDOM();