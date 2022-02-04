const cross = './svg/cross.svg', circle = './svg/circle.svg';
const resetDelay = 800;
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
let grid = new Array(9).fill(''),
    currentPlayer = 'x',
    gameFinished = false;
for (let index = 0; index < 9; index++) {
    const cell = document.createElement('div');
    document.getElementById('board').appendChild(cell);
    cell.appendChild(Object.assign(new Image(), {
        id: 'icon',
        draggable: false
    }));
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
        const icon = cell.childNodes[0];
        if (grid[i] == '')
            icon.style.filter = 'brightness(0)';
        else {
            icon.style.filter = 'invert(1)';
            icon.src = {
                'x': cross,
                'o': circle
            }[grid[i]];
        }
    }
    update();
}
function print(value) {
    document.getElementById('output').textContent = value;
}
function checkWin() {
    for (let i = 0; i < 8; i++) {
        const rule = rules[i];
        if (!grid[rule[0]] == '' &&
            grid[rule[0]] == grid[rule[1]] &&
            grid[rule[1]] == grid[rule[2]]) {
            gameFinished = true;
            print(`${grid[rule[0]].toUpperCase()} won this round!`);
            setTimeout(reset, resetDelay);
            return;
        }
    }
}
function checkTie() {
    if (grid.every(elem => elem.length > 0)) {
        gameFinished = true;
        print('This round is a tie!');
        setTimeout(reset, resetDelay);
    }
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
    checkWin();
    checkTie();
}
renderToDOM();
