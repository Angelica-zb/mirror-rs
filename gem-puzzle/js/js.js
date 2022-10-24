const resultsBg = document.createElement("div");
resultsBg.classList.add("results-bg");
document.body.append(resultsBg);

const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

const resultsTab = document.createElement("div");
resultsTab.classList.add("results-none");
container.append(resultsTab);
let table = document.createElement('table');
resultsTab.append(table);
tr = document.createElement('tr');
table.append(tr);
const td0 = document.createElement('td');
td0.classList.add("table-td");
td0.textContent = 'Score';
tr.append(td0);
const td1 = document.createElement('td');
td1.classList.add("table-td");
td1.textContent = 'Name';
tr.append(td1);
const td2 = document.createElement('td');
td2.classList.add("table-td");
td2.textContent = 'Moves';
tr.append(td2);
const td3 = document.createElement('td');
td3.classList.add("table-td");
td3.textContent = 'Time';
tr.append(td3);
const td4 = document.createElement('td');
td4.classList.add("table-td");
td4.textContent = 'Bord';
tr.append(td4);
const resultItem = document.createElement("div");
resultItem.classList.add("results-item");
resultsTab.append(resultItem);

const namePlayer = document.createElement("div");
namePlayer.classList.add("name-none");
container.append(namePlayer);
const gameCong = document.createElement("h2");
gameCong.classList.add("title");
namePlayer.append(gameCong);
const nameIn = document.createElement("input");
nameIn.setAttribute("type", `text`)
nameIn.setAttribute("placeholder", `Enter your name`)
namePlayer.append(nameIn);
const buttonName = document.createElement("button");
buttonName.classList.add("button");
buttonName.textContent = "Ok";
namePlayer.append(buttonName);

const controlsContainer = document.createElement("div");
controlsContainer.classList.add("controlsContainer");
container.append(controlsContainer);

const gameTitle = document.createElement("h1");
gameTitle.classList.add("title");
gameTitle.textContent = "GEM PUZZLE";
controlsContainer.append(gameTitle);

const controlButton = document.createElement("div");
controlButton.classList.add("controlButton");
controlsContainer.append(controlButton);

const sizeFrame = document.createElement("select");
for (let i = 3; i < 9; i++) {
    let k = document.createElement("option");
    k.textContent = `${i}x${i}`;
    k.setAttribute("value", `${i}`)
    sizeFrame.append(k);
    if (i == 4) {
        k.selected = true;
    }
}
controlButton.append(sizeFrame);

const buttonStart = document.createElement("button");
buttonStart.classList.add("button");
buttonStart.id = "restart";
buttonStart.textContent = "Restart";
controlButton.append(buttonStart);

const buttonResults = document.createElement("button");
buttonResults.classList.add("button");
buttonResults.textContent = "Results";
controlButton.append(buttonResults);

const buttonSound = document.createElement("button");
buttonSound.classList.add("button");
buttonSound.classList.add("buttonSound");
controlButton.append(buttonSound);

const controls = document.createElement("div");
controls.classList.add("controls");
controlsContainer.append(controls);

const time = document.createElement("div");
time.classList.add("time");
controls.append(time);

const moves = document.createElement("div");
moves.classList.add("moves");
controls.append(moves);

const field = document.createElement("div");
field.classList.add("field");
container.append(field);

const controlSave = document.createElement("div");
controlSave.classList.add("controlButton");
container.append(controlSave);

const buttonSave = document.createElement("button");
buttonSave.classList.add("button");
buttonSave.textContent = "Save";
controlSave.append(buttonSave);

const buttonUnload = document.createElement("button");
buttonUnload.classList.add("button-none");
buttonUnload.textContent = 'Unload';
controlSave.append(buttonUnload);

// moves
const movesContainer = document.querySelector(".moves");
let countMoves = 0;
movesContainer.textContent = "Moves: " + countMoves;

// time
let timeMinut = 0
let seconds = ('0' + 0).slice(-2);
let minutes = ('0' + 0).slice(-2);
time.textContent = "Time: " + minutes + ":" + seconds;
let strTimer = `${Math.trunc(minutes)}:${seconds}`;

let timer = setInterval(function() {
    if (seconds < 9) {
        seconds = ('0' + timeMinut % 60);
    } else { seconds = (timeMinut % 60); }
    if (minutes < 9) {
        minutes = ('0' + timeMinut / 60 % 60);
    } else { minutes = (timeMinut / 60 % 60); }
    strTimer = `${Math.trunc(minutes)}:${seconds}`;
    time.textContent = "Time: " + strTimer;
    timeMinut++;
}, 1000)

// sound
const sounds = [{
        src: './sounds/whoosh.mp3',
    },
    {
        src: './sounds/win.mp3',
    }
]
let isPlay = true;
const audio = new Audio();

function playAudio(sound) {
    if (isPlay) {
        audio.src = sounds[sound].src;
        audio.play();
    }
}

buttonSound.addEventListener("click", () => {
    isPlay ? isPlay = false : isPlay = true;
    buttonSound.classList.toggle("sound-none")
})

// selectSize
let sizeField = sizeFrame.value

sizeFrame.addEventListener("click", function(e) {
    if (sizeField != sizeFrame.value) {
        field.classList.remove('winner')
        sizeField = sizeFrame.value
        makeField(sizeField)
        buttonCountNode = Array.from(field.querySelectorAll('.buttonCount'))
        countButtom = +(sizeField * sizeField);
        buttonCountNode[countButtom - 1].innerHTML = ''
        buttonCountNode[countButtom - 1].classList.add("hide2");
        buttonCountNode[countButtom - 1].classList.remove("buttonCount");
        matrix = getMatrix(buttonCountNode.map((buttonCount) => Number(buttonCount.dataset.matrixId)), sizeField)
        flatMatrix = matrix.flat()
        shuffleArr(flatMatrix, countButtom)
        matrix = getMatrix(flatMatrix, sizeField)
        setPositionButtom(matrix)
        let countMoves = 0;
        movesContainer.textContent = "Moves: " + countMoves;
        let seconds = ('0' + 0).slice(-2);
        let minutes = ('0').slice(-2);
        time.textContent = "Time: " + minutes + ":" + seconds;
        timeMinut = 0
        draggableBut()
    }
})

//make field
makeField(sizeField)

function makeField(sizeField) {
    field.innerHTML = '';
    for (let i = 0; i < (sizeField * sizeField); i++) {
        let buttonCount = document.createElement("button");
        buttonCount.classList.add("buttonCount");
        buttonCount.setAttribute("data-matrix-id", `${i+1}`)
            // buttonCount.setAttribute("draggable", `true`);
        buttonCount.textContent = `${i+1}`;
        field.append(buttonCount);
        buttonCount.style.width = `${(100/sizeField)}%`
        buttonCount.style.height = `${(100/sizeField)}%`
    }
}

//first load
let buttonCountNode = Array.from(field.querySelectorAll('.buttonCount'))
let countButtom = +(sizeField * sizeField);
buttonCountNode[countButtom - 1].innerHTML = ''
buttonCountNode[countButtom - 1].classList.add("hide2");
buttonCountNode[countButtom - 1].classList.remove("buttonCount");
let matrix = getMatrix(buttonCountNode.map((buttonCount) => Number(buttonCount.dataset.matrixId)), sizeField)
flatMatrix = matrix.flat()
shuffleArr(flatMatrix, countButtom)
matrix = getMatrix(flatMatrix, sizeField)
setPositionButtom(matrix)

//shuffle
let shuffle = document.getElementById('restart')
shuffle.addEventListener('click', function() {
    field.classList.remove('winner')
    flatMatrix = matrix.flat()
    shuffleArr(flatMatrix, countButtom)
    matrix = getMatrix(flatMatrix, sizeField)
    setPositionButtom(matrix)
    let countMoves = 0;
    movesContainer.textContent = "Moves: " + countMoves;
    let seconds = ('0' + 0).slice(-2);
    let minutes = ('0').slice(-2);
    time.textContent = "Time: " + minutes + ":" + seconds;
    timeMinut = 0
    draggableBut()
})

//change position

field.addEventListener('click', (event) => {
    let emptyButton = +(sizeField * sizeField);
    const buttonField = event.target.closest('button')
    if (!buttonField) {
        return
    }
    const buttonNum = Number(buttonField.dataset.matrixId);
    const buttonXY = findXYbutton(buttonNum, matrix);
    const emptyXY = findXYbutton(emptyButton, matrix);
    const isOk = okSwap(buttonXY, emptyXY)
    if (isOk) {
        playAudio(0);
        changePosition(buttonXY, emptyXY, matrix);
        setPositionButtom(matrix, sizeField);
        countMoves++;
        movesContainer.textContent = "Moves: " + countMoves;
        draggableBut()
            //win
        if (isWin(matrix)) {
            addWinClass();
        }
    }
})

// Drag'n'Drop
const dragStart = function() {
    setTimeout(() => {
        this.classList.add('hide')
    }, 0)
}
const dragEnd = function() {
    this.classList.remove('hide')
}
const dragOver = function(evt) {
    evt.preventDefault();
}
const dragEnter = function(evt) {
    evt.preventDefault();
    this.classList.add('hovered')
}
const dragLeave = function() {
    this.classList.remove('hovered')
}
const dragDrop = function() {
    this.classList.remove('hovered')
    let emptyButton = +(sizeField * sizeField);
    let move = document.querySelector('.hide')
    const buttonNum = Number(move.dataset.matrixId);
    const buttonXY = findXYbutton(buttonNum, matrix);
    const emptyXY = findXYbutton(emptyButton, matrix);
    playAudio(0);
    changePosition(buttonXY, emptyXY, matrix);
    setPositionButtom(matrix, sizeField);
    countMoves++;
    movesContainer.textContent = "Moves: " + countMoves;
    draggableBut()
}

function draggableBut() {
    const buttonNone = document.querySelector('.hide2')
    buttonNone.addEventListener('dragover', dragOver)
    buttonNone.addEventListener('dragenter', dragEnter)
    buttonNone.addEventListener('dragleave', dragLeave)
    buttonNone.addEventListener('drop', dragDrop)
    let buttonsDD = document.querySelectorAll('.buttonCount');
    for (let i = 0; i < buttonsDD.length; i++) {
        let buttonDD = buttonsDD[i]
        buttonDD.setAttribute("draggable", `false`);
        let emptyButton = +(sizeField * sizeField);
        const buttonNum = Number(buttonDD.dataset.matrixId);
        const buttonXY = findXYbutton(buttonNum, matrix);
        const emptyXY = findXYbutton(emptyButton, matrix);
        const isOk = okSwap(buttonXY, emptyXY)
        if (isOk) {
            buttonDD.setAttribute("draggable", `true`);
            buttonDD.addEventListener('dragstart', dragStart)
            buttonDD.addEventListener('dragend', dragEnd)
        }
    }
    if (isWin(matrix)) {
        addWinClass();
    }
}
draggableBut()

//results
let res = JSON.parse(localStorage.getItem('results')) || [];
buttonName.addEventListener('click', function() {
    controlsContainer.classList.remove('button-n');
    controlSave.classList.remove('button-n');
    let winer = {
        'Name': nameIn.value,
        'Moves': countMoves,
        'Time': strTimer,
        'Bord': `${sizeField}x${sizeField}`
    }
    res.push(winer)
    localStorage.setItem('results', JSON.stringify(res));
    nameIn.value = ''
    namePlayer.classList.remove("name");
    namePlayer.classList.add("name-none");
})

buttonResults.addEventListener('click', function() {
    resultsTab.classList.add("results");
    resultsBg.classList.add("results-bg-active");
    sortArr(res, ["Moves", "Time"])
    if (res.length > 10) {
        res.length = 10;
    }
    resultItem.innerHTML = "";
    let table = document.createElement('table');
    resultItem.append(table);
    for (let i = 0; i < res.length; i++) {
        tr = document.createElement('tr');
        table.append(tr);
        const td1 = document.createElement('td');
        td1.classList.add("table-td");
        td1.textContent = i + 1;
        tr.append(td1);
        for (let key in res[i]) {
            const td2 = document.createElement('td');
            td2.classList.add("table-td");
            td2.textContent = res[i][key] || 0;
            tr.append(td2);
        }
    }
})

resultsBg.addEventListener('click', function() {
    resultsTab.classList.remove("results");
    resultsBg.classList.remove("results-bg-active");
})

//Save
buttonSave.addEventListener('click', function() {
    localStorage.setItem('Matrix', JSON.stringify(matrix));
    localStorage.setItem('SizeField', JSON.stringify(+sizeField));
    localStorage.setItem('Time', JSON.stringify(timeMinut));
    localStorage.setItem('Moves', JSON.stringify(countMoves));
    buttonUnload.classList.add("button");
    buttonUnload.classList.remove("button-none");
})

if (JSON.parse(localStorage.getItem('Matrix'))) {
    buttonUnload.classList.add("button");
    buttonUnload.classList.remove("button-none");
}

buttonUnload.addEventListener('click', function() {
    if (JSON.parse(localStorage.getItem('Matrix'))) {
        matrix = JSON.parse(localStorage.getItem('Matrix'));
        sizeField = JSON.parse(localStorage.getItem('SizeField'));
        timeMinut = JSON.parse(localStorage.getItem('Time'));
        countMoves = JSON.parse(localStorage.getItem('Moves'));
        movesContainer.textContent = "Moves: " + countMoves;
        makeField(sizeField)
        buttonCountNode = Array.from(field.querySelectorAll('.buttonCount'))
        countButtom = sizeField * sizeField;
        buttonCountNode[countButtom - 1].innerHTML = ''
        buttonCountNode[countButtom - 1].classList.add("hide2");
        buttonCountNode[countButtom - 1].classList.remove("buttonCount");
        sizeFrame.value = sizeField
        setPositionButtom(matrix)
        draggableBut()
    }
})

//Helpers
function getMatrix(arr, size) {
    const matrix = [
        [],
        [],
        []
    ]
    if (size > 3) {
        for (let i = 4; i <= size; i++) {
            matrix.push([])
        }
    }
    let y = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        if (x >= size) {
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i];
        x++;
    }
    return matrix
}

function setPositionButtom(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const value = matrix[y][x];
            const node = buttonCountNode[value - 1];
            setNodeStyles(node, x, y)
        }
    }
}

function setNodeStyles(node, x, y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${Math.round(x*shiftPs)}%,${Math.round(y*shiftPs)}%,0)`
}

function shuffleArr(array, size) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    let sum = 0;
    let row = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j] && array[i] !== size) {
                sum++;
            }
        }
        if (array[i] === size) {
            row = Math.ceil((i + 1) / Math.sqrt(size));
        }
    }
    if (size % 2 === 0) {
        if ((sum + row) % 2 !== 0) {
            shuffleArr(array, size)
        }
    } else {
        if (sum % 2 !== 0) {
            shuffleArr(array, size)
        }
    }
}

function findXYbutton(num, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === num) {
                return { x, y };
            }
        }
    }
}

function okSwap(xy1, xy2) {
    const difX = Math.abs(xy1.x - xy2.x);
    const difY = Math.abs(xy1.y - xy2.y);
    if ((difX === 1 || difY === 1) && (xy1.x === xy2.x || xy1.y === xy2.y)) { return true } else return false
}

function changePosition(xy1, xy2, matrix) {
    const buttonNum = matrix[xy1.y][xy1.x];
    matrix[xy1.y][xy1.x] = matrix[xy2.y][xy2.x];
    matrix[xy2.y][xy2.x] = buttonNum;

}

function isWin(matrix) {
    let winArr = Array.from(field.querySelectorAll('.buttonCount'));
    winArr = winArr.map((buttonCount) => Number(buttonCount.dataset.matrixId));
    const matrixArr = matrix.flat();
    for (let x = 0; x < winArr.length; x++) {
        if (winArr[x] !== matrixArr[x]) {
            return false;
        }
    }
    return true
}

function addWinClass() {
    setTimeout(() => {
        field.classList.add('winner');
        controlsContainer.classList.add('button-n');
        controlSave.classList.add('button-n');
        playAudio(1)
        clearInterval(timer)
        gameCong.textContent = `"Hooray! You solved the puzzle in ${time.textContent} and ${countMoves} moves!"`;
        setTimeout(() => {
            namePlayer.classList.add("name");
            namePlayer.classList.remove("name-none");

        }, 1000)

    }, 200)
}

function sortArr(objArr, propName) {
    for (let i = 0; i < objArr.length; ++i)
        objArr[i] = [objArr[i], i];

    function comparator(a, b) {
        for (let prop of propName) {
            if (a[0][prop] < b[0][prop])
                return -1;
            else if (a[0][prop] > b[0][prop])
                return 1;
        }
        return a[1] - b[1];
    }

    objArr.sort(comparator);

    for (let i = 0; i < objArr.length; ++i)
        objArr[i] = objArr[i][0];
}