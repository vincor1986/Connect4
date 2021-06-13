const yellow = '#FCBF49';
const red = '#D62828';

let p1 = '';
let p2 = '';

const init = () => {
    let player1 = prompt('Player One: Enter Your Name, you will be Yellow');
    p1 = player1;
    let player2 = prompt('Player Two: Enter Your Name, you will be Red');
    p2 = player2;
    $('table').css('pointer-events', 'all');
    $('#msg').text(`${p1}: it is your turn...`)
  
}

let mode = 0;

$('#onePlayer').on('click', () => {
    $('.modeSelect').css('display', 'none');
    onePlayerSetup();
})

$('#twoPlayer').on('click', () => {
    $('.modeSelect').css('display', 'none');
    setTimeout(init, 1000)
    setTimeout( () => {
        $('td').on('click', function() {
            update($(this))
        });
    }, 1500)
})

let msg = $('#msg').text();

let currentCol = yellow;
let currentPlayer = 1;

const update = (el) => {

    let col = el.attr('id');
    let row;
    
    for (let i = 5; i > -1; i--) {
        let space = $(`[id=${col}]`).eq(i).css('background-color')
        if (space === 'rgb(88, 151, 185)') {
            $(`[id=${col}]`).eq(i).css('background', currentCol);
            row = i;
            break
        } else {
            continue
        }
    }

    if (row === undefined) {
        $('#msg').text('That column is full! Please select another column')
        return
    }

    if (checkWin(row, col)) {
       
        $('#msg').html(`${currentPlayer === 1 ? p1 : p2}, you are the winner!  Click <a href="./index.html">here</a> to play again.`);

        $('table').css('pointer-events', 'none')
    }

    else if(noMoreMoves()) {

        $('#msg').html(`There are no more available moves.  Click <a href="./index.html">here</a> to play again.`);

        $('table').css('pointer-events', 'none')

    }

    else {

        msg = $('#msg').text();

        if(msg === `${p1}: it is your turn...`) {
            $('#msg').text(`${p2}: it is your turn...`);
        } else {
            $('#msg').text(`${p1}: it is your turn...`)
        }

        changeColor();

        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }


}

const changeColor = () => {
    if (currentCol === yellow) {
        currentCol = red;
    } else {
        currentCol = yellow;
    }
}

const checkWin = (row, col) => {
    if (checkVert(col) || checkHoriz(row) || checkDiag(row, col)) {
        game = 0;
        console.log('win');
        return true;
    }
}

const checkVert = (col) => {
    let count = 0;
    let arr = [];

    for (let i = 4; i >= 0; i--) {
        let curr = $(`[id=${col}]`).eq(i).css('background-color');
        let last = $(`[id=${col}]`).eq(i + 1).css('background-color');

         if (curr === last && curr !== 'rgb(88, 151, 185)') {
            count++
            arr.push([i, col], [i + 1, col])
        } else {
            count = 0;
            arr = [];
        }

        if (count === 3) {
            break
        }
    }

    let winline = new Set(arr);

    if (count === 3) {
        drawWinline(winline);
        console.log('vertical win')
        return true;
    }
}

const checkHoriz = (row) => {
    let count = 0;
    let arr = [];

    for (let i = 2; i <= 7; i++) {
        let curr = $(`[id=${i}]`).eq(row).css('background-color');
        let last = $(`[id=${i - 1}]`).eq(row).css('background-color');

        if (curr === last && curr !== 'rgb(88, 151, 185)') {
            count++
            arr.push([row, i], [row, i - 1])

        } else {
            count = 0;
            arr = []
        }

        if (count === 3) {
            break
        }
    }

    let winline = new Set(arr);

    if (count === 3) {
        drawWinline(winline)
        console.log('horizontal win');
        return true;
    }
}

const checkDiag = (row, col) => {
    count = 0;
    let arr = [];    

    for (let i = col - 3, j = row - 3; i <= col + 3; i++, j++) {

        if (i < 0 || j < 0) continue;

        let curr = $(`[id=${i}]`).eq(j).css('background-color');
        let next = $(`[id=${i + 1}]`).eq(j + 1).css('background-color');

        if (curr === next && curr !== 'rgb(88, 151, 185)' && curr != undefined) {
            count++
            arr.push([j, i], [j + 1, i + 1])
        } else {
            count = 0
            arr = [];
        }

        if (count === 3) {
            break
        }
    }

    let winline = new Set(arr);

    if (count === 3) {
        drawWinline(winline);
        console.log('diagonal win');
        return true
    }

    count = 0;
    arr = [];

    for (let i = col - 3, j = row + 3; i <= col + 3; i++, j--) {

        if (i < 0 || j < 1) continue;

        let curr = $(`[id=${i}]`).eq(j).css('background-color');
        let next = $(`[id=${i + 1}]`).eq(j - 1).css('background-color');

        if (curr === next && curr !== 'rgb(88, 151, 185)' && curr != undefined) {
            count++
            arr.push([j, i], [j - 1, i + 1])
        } else {
            count = 0;
            arr = [];
        }

        if (count === 3) {
            break
        }
    }

    winline = new Set(arr);

    if (count === 3) {
        drawWinline(winline);
        console.log('diagonal win');
        return true
    }
}

const noMoreMoves = () => {
    let arr = $('td');
    let count = 0;

    for(let i = 0; i < arr.length; i++) {
        if ($('td').eq(i).css('background-color') === 'rgb(88, 151, 185)') {
            count++;
            break
        }
    }

    if (count === 0) {
        return true
    }
}

const drawWinline = (set) => {
    set.forEach(val => {
        $(`[id=${val[1]}]`).eq(val[0]).css('border', '6px solid #F77F00')
    })
}

const randomNum = (n) => {
    return Math.floor(Math.random() * n) + 1
}

const toggleTable = () => {
    let pE = $('table').css('pointer-events');
    pE === 'all' ? $('table').css('pointer-events', 'none') : $('table').css('pointer-events', 'all')
}

const onePlayerSetup = () => {
    let firstMove = randomNum(2);

    if (firstMove === 1) {
        $('#msg').text('You have the first move.')
        toggleTable();
        $('td').on('click', function() {
            toggleTable();
            listenForMove($(this));
        })
    } else {
        cpuTurn();
        $('td').on('click', function() {
            toggleTable();
            listenForMove($(this));
        })
    }

}

const listenForMove = (el) => {
    let col = el.attr('id');
    let row;
    
    for (let i = 5; i > -1; i--) {
        let space = $(`[id=${col}]`).eq(i).css('background-color')
        if (space === 'rgb(88, 151, 185)') {
            $(`[id=${col}]`).eq(i).css('background', currentCol);
            row = i;
            break
        } else {
            continue
        }
    }

    if (row === undefined) {
        $('#msg').text('That column is full! Please select another...');
        toggleTable();
        return;
    }

    if (checkWin(row, col)) {
       
        $('#msg').html(`You are the winner! Click <a href="./index.html">here</a> to play again.`);

        $('table').css('pointer-events', 'none');

        return;
    }

    else if(noMoreMoves()) {

        $('#msg').html(`There are no more available moves. Click <a href="./index.html">here</a> to play again.`);

        $('table').css('pointer-events', 'none')

        return;
    }

    changeColor();

    cpuTurn();
}


const spaceBelow = (row, col) => {
    return row === 5 ? true : $(`[id=${col}]`).eq(row + 1).css('background-color') !== 'rgb(88, 151, 185)' && $(`[id=${col}]`).eq(row + 1).css('background-color') !== undefined;
}


const analyse = () => {
    let count = 0;
    let was = 0;

    //VERTICAL ANALYSIS

    for (let c = 1; c < 8; c++) {

        for (let i = 4; i >= 0; i--) {
            let curr = $(`[id=${c}]`).eq(i).css('background-color');
            let last = $(`[id=${c}]`).eq(i + 1).css('background-color');


            // v1
            if (count === 2 && curr === 'rgb(88, 151, 185)'){
                console.log('v1');
                return c;
            }
    
            if (curr === last && curr !== 'rgb(88, 151, 185)') {
                was = count;
                count++
            } else {
                was = count;
                count = 0;
            }
        }

        count = 0;
        was = 0;
    }

    //HORIZONATAL ANALYSIS

    for (let j = 0; j < 6; j++) {

        for (let i = 2; i <= 7; i++) {
            let curr = $(`[id=${i}]`).eq(j).css('background-color');
            let last = $(`[id=${i - 1}]`).eq(j).css('background-color');
            let prev = $(`[id=${i - 2}]`).eq(j).css('background-color');
           
            // h1.1
            if (count === 2 && curr === 'rgb(88, 151, 185)' && spaceBelow(j, i)) {
                console.log('h1.1')
                return i;
            }

            //h1.2
            if (was === 1 && prev === curr && last === 'rgb(88, 151, 185)' && curr !== 'rgb(88, 151, 185)' && spaceBelow(j, i - 1)){
                console.log('h1.2');
                return i - 1;
            }
            
            if (curr === last && curr !== 'rgb(88, 151, 185)') {
                was = count;
                count++
    
            } else {
                was = count;
                count = 0;
            }
    
        }

        count = 0;
        was = 0;

        for (let i = 6; i >= 0; i--) {
            let curr = $(`[id=${i}]`).eq(j).css('background-color');
            let last = $(`[id=${i + 1}]`).eq(j).css('background-color');
            let prev = $(`[id=${i + 2}]`).eq(j).css('background-color');
            
            // h2.1
            if (count === 2 && curr === 'rgb(88, 151, 185)' && spaceBelow(j, i)) {
                console.log('h2.1')
                return i;
            }    
            
            // h2.2
            if (was === 1 && prev === curr && last === 'rgb(88, 151, 185)' && curr !== 'rgb(88, 151, 185)' && spaceBelow(j, i + 1)){
                console.log('h2.2')
                return i + 1;
            }

            if (curr === last && curr !== 'rgb(88, 151, 185)') {
                was = count;
                count++
    
            } else {
                was = count;
                count = 0;
            }
        }
    }

    count = 0;
    was = 0;

    // DIAGONAL ANALYSIS

    //diagonal down

    for (let z = 0; z < 6; z++) {

        for (let i = 1, j = 2 - z, pass = 0; pass < 7 ; i++, j++, pass++) {
    
            if (i < 0 || j > 5) continue;

            let prev = $(`[id=${i - 1}]`).eq(j - 1).css('background-color');
            let curr = $(`[id=${i}]`).eq(j).css('background-color');
            let next = $(`[id=${i + 1}]`).eq(j + 1).css('background-color');

            // dd1.1
            if (count === 2 && next === 'rgb(88, 151, 185)' && spaceBelow(j + 1, i + 1)) {
                console.log('dd1.1')
                return i + 1;
            }

            // dd1.2
            if (was === 1 && prev === next && curr === 'rgb(88, 151, 185)' && next !== 'rgb(88, 151, 185)' && i - 1 > 0 && i + 1 < 8 && spaceBelow(j, i)){
                console.log('dd1.2')
                return i;
            }
    
            if (curr === next && curr !== 'rgb(88, 151, 185)' && curr != undefined) {
                was = count;
                count++
            } else {
                was = count;
                count = 0
            }
        }
    }

    count = 0;
    was = 0;

    for (let z = 0; z < 6; z++) {

        for (let i = 7, j = 2 - z, pass = 0; pass < 7 ; i--, j++, pass++) {
    
            if (i < 0 || j > 5) continue;

            let prev = $(`[id=${i + 1}]`).eq(j - 1).css('background-color');
            let curr = $(`[id=${i}]`).eq(j).css('background-color');
            let next = $(`[id=${i - 1}]`).eq(j + 1).css('background-color');

            // dd2.1
            if (count === 2 && next === 'rgb(88, 151, 185)' && spaceBelow(j + 1, i - 1)) {
                console.log('dd2.1')
                return i - 1;
            }

            // dd2.2
            if (was === 1 && prev === next && curr === 'rgb(88, 151, 185)' && next !== 'rgb(88, 151, 185)' && i -
             1 > 0 && i + 1 < 8 && spaceBelow(j, i)){
                console.log('dd2.2')
                return i;
            }
    
            if (curr === next && curr !== 'rgb(88, 151, 185)' && curr != undefined) {
                was = count;
                count++
            } else {
                was = count;
                count = 0
            }
        }
    }

    count = 0;
    was = 0;

    //diagonal up

    for (let z = 0; z < 6; z++) {

        for (let i = 1, j = 3 + z, pass = 0; pass < 7 ; i++, j--, pass++) {
    
            if (i < 0 || j > 5) continue;

            let prev = $(`[id=${i - 1}]`).eq(j + 1).css('background-color');
            let curr = $(`[id=${i}]`).eq(j).css('background-color');
            let next = $(`[id=${i + 1}]`).eq(j - 1).css('background-color');

            // du1.1

            if (count === 2 && next === 'rgb(88, 151, 185)' && spaceBelow(j - 1, i + 1)) {
                console.log('du1.1')
                return i + 1;
            }

            // du1.2

            if (was === 1 && prev === next && curr === 'rgb(88, 151, 185)' && next !== 'rgb(88, 151, 185)' && i - 1 > 0 && i + 1 < 8 && spaceBelow(j, i)){
                console.log('du1.2')
                return i;
            }
    
            if (curr === next && curr !== 'rgb(88, 151, 185)' && curr != undefined) {
                was = count;
                count++
            } else {
                was = count;
                count = 0
            }
        }
    }

    count = 0;
    was = 0;

    for (let z = 0; z < 6; z++) {

        for (let i = 7, j = 3 + z, pass = 0; pass < 7 ; i--, j--, pass++) {
    
            if (i < 0 || j > 5) continue;

            let prev = $(`[id=${i + 1}]`).eq(j + 1).css('background-color');
            let curr = $(`[id=${i}]`).eq(j).css('background-color');
            let next = $(`[id=${i - 1}]`).eq(j - 1).css('background-color');

            //du2.1

            if (count === 2 && next === 'rgb(88, 151, 185)' && spaceBelow(j - 1, i - 1)) {
                console.log('du2.1')
                return i - 1;
            }

            // du2.2

            if (was === 1 && prev === next && curr === 'rgb(88, 151, 185)' && next !== 'rgb(88, 151, 185)' && i -
             1 > 0 && i + 1 < 8 && spaceBelow(j, i)){
                console.log('du2.2')
                return i;
            }
    
            if (curr === next && curr !== 'rgb(88, 151, 185)' && curr != undefined) {
                was = count;
                count++
            } else {
                was = count;
                count = 0
            }
        }
    }

    console.log('no moves found, taking random move')
}

const cpuMove = () => {

    let col = randomNum(7);

    if (analyse() > 0 && analyse() !== undefined) {
        col = analyse();
    }

    console.log('col: ', col);
    
    let row;

    let move = 'notTaken';

    for (let i = 5; i > -1; i--) {
        let space = $(`[id=${col}]`).eq(i).css('background-color')
        if (space === 'rgb(88, 151, 185)') {
            $(`[id=${col}]`).eq(i).css('background', currentCol);
            row = i;
            move = 'taken';
            break
        } else {
            continue
        }
    }
    
    console.log('row: ', row);


}

const takeMove = () => {

    let col 
    let row;

    let move = 'notTaken';

    if (analyse() > 0 && analyse() !== undefined) {
        col = analyse();
    } else {
        col = randomNum(7);
    }

    let x = 0;

    while (move === 'notTaken') {

        if (x !== 0) { col = randomNum(7) };

        console.log('col: ', col);

        for (let i = 5; i > -1; i--) {
            let space = $(`[id=${col}]`).eq(i).css('background-color')
            if (space === 'rgb(88, 151, 185)') {
                $(`[id=${col}]`).eq(i).css('background', currentCol);
                row = i;
                move = 'taken';
                break
            } else {
                continue
            }
        }

        x++;
    }

    console.log('row: ', row);

    if (checkWin(row, col)) {
       
        $('#msg').html(`JavaScript is the winner! Click <a href="./index.html">here</a> to play again.`);

        $('table').css('pointer-events', 'none')

        return;
    }

    else if(noMoreMoves()) {

        $('#msg').html(`There are no more available moves. Click <a href="./index.html">here</a> to play again.`);

        $('table').css('pointer-events', 'none')

        return;

    }    
    
    $('#msg').text("It's your turn...");

    changeColor();

    toggleTable();

}

const cpuTurn = () => {

    $('#msg').text('JavaScript is thinking...');
    setTimeout(takeMove, 800);



}