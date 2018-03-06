function start() {
	const numberOfCols = 20;
	const numberOfRows = 15;
	var boxtop = 200;
	var boxleft = 200;
	var rightPressed = false;
	var leftPressed = false;
	var upPressed = false;
	var downPressed = false;
	var box = document.getElementById("box");
    const map = [
        "    WWWWW          ",
        "    WWWWW          ",
        "    W   W          ",
        "    WB  W          ",
        "  WWW  BWW         ",
        "  W  B B W         ",
        "WWW W WW W   WWWWWW",
        "W   W WW WWWWW  OOW",
        "W B  B          OOW",
        "WWWWW WWW WSWW  OOW",
        "WWWWW     WWWWWWWWW",
        "WWWWWWWWWWWWWWWWWWW", 
        "WWWWWWWWWWWWWWWWWWW"
    ];
	
	const mapLen = map.length;
	const gameBoard = document.getElementById('container');
	const makeGrid = (start) => {
        if (map[7][16] === "B" && map[7][17] === "B" && map[8][16] === "B" && map[8][17] === "B" && map[9][16] === "B" && map[9][17] === "B"){
            alert('You win');
        }

		//go through the array.length
		for (let row = 0; row < start.length; row++) {
			const rows = document.createElement('div');
			rows.classList.add('row');
			let playerPos;
			//go through the string
			//add div + give class
			let string = start[row];
			for (let char = 0; char < string.length; char++) {
				letter = string[char];
				const cell = document.createElement('div');
				if (letter === "W") {
					cell.classList.add('cell');
				} else if (letter === "S") { //if S give it the id of player
					cell.setAttribute('id', "player");
				} else if (letter === "O") {
					cell.classList.add('emptyStorage') //if O then give it an emply storage container class
				} else if (letter === 'B') {
					cell.classList.add('boxToMove') //if B it will be a box that players can move around the box to put into storageh containers
				} else {
					cell.classList.add('blank');
				}
				rows.appendChild(cell);
			}
			gameBoard.appendChild(rows);
		}
	}
	makeGrid(map);
	document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    

	function keyDownHandler(e) {
		if (e.keyCode == 39) { //RIGHT
			reset(gameBoard);
			for (i = 0; i < map.length; i++) {
				let splitRow = map[i].split("");
				let s = splitRow.indexOf("S");
				if (map[i].includes("S") && map[i][s + 1] == " ") {
					splitRow.splice(s, 1);
					splitRow.splice((s + 1), 0, "S");
					let joinRow = splitRow.join('');
					map[i] = joinRow;
					let newMap = map;
				}
				if (map[i][s + 1] == "B" && map[i][s + 2] !== "W" && map[i][s + 2] !== "B") {
					splitRow.splice(s, 1, " ");
					splitRow.splice((s + 1), 2, "S", "B");
					let joinRow = splitRow.join('');
					map[i] = joinRow;
					let newMap = map;
				}
				//Making player able to move across storage containers without affecting it, not done
				if (map[i][s + 1] == "O") {
					splitRow.splice(s, 1, " ");
					splitRow.splice((s + 1), 1, "S");
					let joinRow = splitRow.join('');
					map[i] = joinRow;
					let newMap = map;
				}
			}
            makeGrid(map);
            
		} else if (e.keyCode == 37) { //LEFT
			reset(gameBoard);
			for (i = 0; i < map.length; i++) {
				let splitRow = map[i].split("");
				let s = splitRow.indexOf("S");
				if (map[i].includes("S") && map[i][s - 1] == " ") {
					splitRow.splice(s, 1);
					splitRow.splice((s - 1), 0, "S");
					let joinRow = splitRow.join('');
					map[i] = joinRow;
					let newMap = map;
				}
				if (map[i][s - 1] == "B" && map[i][s - 2] !== "W" && map[i][s - 2] !== "B") {
					splitRow.splice(s, 1, " ");
					splitRow.splice((s - 2), 2, "B", "S");
					let joinRow = splitRow.join('');
					map[i] = joinRow;
					let newMap = map;
				}
				// Making player able to move across storage containers without affecting it, not done
				if (map[i][s - 1] == "O") {
					splitRow.splice(s, 1);
					splitRow.splice((s - 1), 1, "S", " ");
					let joinRow = splitRow.join('');
					map[i] = joinRow;
					let newMap = map;
				}
			}
			makeGrid(map);
			leftPressed = true;
		} else if (e.keyCode == 38) { //UP
			reset(gameBoard);
			for (i = 0; i < map.length; i++) {
				if (map[i].includes("S")) {
					let aboveRow = map[i - 1].split('');
					let aboveRow2 = map[i - 2].split('');
					let splitRow = map[i].split('');
					let s = splitRow.indexOf("S");
					if (map[i - 1][s] == " " || map[i - 1][s] == "" && map[i - 2][s] !== "W") {
						splitRow.splice(s, 1, " ");
						aboveRow.splice((s), 1, "S");
						let joinRow = splitRow.join('');
						map[i] = joinRow;
						let joinRow2 = aboveRow.join('');
						map[i - 1] = joinRow2;
						let newMap = map;
						// Making player able to move across storage containers without affecting it, not done
						if (map[i - 1][s] == "O") {
							splitRow.splice(s, 1);
							aboveRow.splice((s - 1), 1, "S");
							let joinRow = splitRow.join('');
							map[i] = joinRow;
							let newMap = map;
						}
					} else if (map[i - 1][s] == "B" && map[i - 2][s] !== "W" && map[i - 2][s] !== "B") {
						splitRow.splice(s, 1, " ");
						aboveRow.splice(s, 1, "S")
						aboveRow2.splice(s, 1, "B");
						let joinRow = splitRow.join('');
						map[i] = joinRow;
						let joinRow2 = aboveRow.join('');
						let joinRow3 = aboveRow2.join('');
						map[i - 1] = joinRow2
						map[i - 2] = joinRow3
						let newMap = map;
					} else {
						let newMap = map;
					}
				}
			}
			makeGrid(map);
			upPressed = true;
		} else if (e.keyCode == 40) { //DOWN
			reset(gameBoard);
			for (i = 0; i < map.length; i++) {
				if (map[i].includes("S")) {
					let underRow = map[i + 1].split('');
					let splitRow = map[i].split('');
					let s = splitRow.indexOf("S");
					let underRow2 = map[i + 2].split('');
					if (map[i + 1][s] == " " || map[i - 1][s] == "" && map[i - 2][s] !== "W") {
						splitRow.splice(s, 1, " ");
						underRow.splice((s), 1, "S");
						let joinRow = splitRow.join('');
						map[i] = joinRow;
						let joinRow2 = underRow.join('');
						map[i + 1] = joinRow2;
						let newMap = map;
					} else if (map[i + 1][s] == "B" && map[i + 2][s] !== "W" && map[i + 2][s] !== "B") {
						splitRow.splice(s, 1, " ");
						underRow.splice(s, 1, "S")
						underRow2.splice(s, 1, "B");
						let joinRow = splitRow.join('');
						map[i] = joinRow;
						let joinRow2 = underRow.join('');
						let joinRow3 = underRow2.join('');
						map[i + 1] = joinRow2
						map[i + 2] = joinRow3
						let newMap = map;
					} else {
						let newMap = map;
					}
					break;
				}
			}
			makeGrid(map);
			downPressed = true;
		}
	}

	function keyUpHandler(e) {
		if (e.keyCode == 39) {
			rightPressed = false;
		} else if (e.keyCode == 37) {
			leftPressed = false;
		} else if (e.keyCode == 38) {
			upPressed = false;
		} else if (e.keyCode == 40) {
			downPressed = false;
		}
	}
}


function reset(main) {
	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
}