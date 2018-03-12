const template = [
	"",
	"                   ",
	"WWWWW   WWWWWWWWWWW",
	"WWWWWB  WWWWWWWWWWW",
	"WWWWW  BWWWWWWWWWWW",
	"WWW  B B WWWWWWWWWW",
	"WWW W WW WWWWWWWWWW",
	"                OOW",
	"                OOW",
	"                OOW",
	"WWWWW     WWWWWWWWW",
	"WWWWWWWWWWWWWWWWWWW",
	"QWWWWWWWWWWWWWWWWWQ"
  ];
  
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
	  "                   ",
	  "WWWWWWWWWWWWWWWWWWW",
	  "WWWWW   WWWWWWWWWWW",
	  "WWWWWB  WWWWWWWWWWW",
	  "WWWWW  BWWWWWWWWWWW",
	  "WWW  B B WWWWWWWWWW",
	  "WWW W WW WWWWWWWWWW",
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
	  if (map[7][16] === "B" && map[7][17] === "B" && map[8][16] === "B" && map[8][17] === "B" && map[9][16] === "B" && map[9][17] === "B") {
		alert('You win!');
	  }
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
		  } else if (letter === "S") { //S represets Chuck Norris
			cell.setAttribute('id', "player");
			cell.classList.add('animated', 'rubberBand');
		  } else if (letter === "O") { //O represents the jail cells
			cell.classList.add('emptyStorage') 
		  } else if (letter === "B") { //B represents the enemy
			cell.classList.add('boxToMove', 'animated', 'infinite', 'swing');
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
		for (Row = 0; Row < map.length; Row++) {
		  let splitRow = map[Row].split("");
		  let playerPosition = splitRow.indexOf("S");
		  if (playerPosition >= 0 && map[Row][playerPosition + 1] == "W") {
			break;
		  }
		  if (map[Row].includes("S") && map[Row][playerPosition + 1] == " ") {
			splitRow.splice(playerPosition, 1);
			splitRow.splice((playerPosition + 1), 0, "S");
			let joinRow = splitRow.join('');
			map[Row] = joinRow;
		  }
		  if (map[Row][playerPosition + 1] == "B" && map[Row][playerPosition + 2] == "W") {
			break;
		  }
		  if (map[Row][playerPosition + 1] == "B" && map[Row][playerPosition + 2] !== "W" && map[Row][playerPosition + 2] !== "B" && map[Row][playerPosition + 2] !== "W") {
			splitRow.splice(playerPosition, 1, " ");
			splitRow.splice((playerPosition + 1), 2, "S", "B");
			let joinRow = splitRow.join('');
			map[Row] = joinRow;
			let newMap = map;
		  }
		  //Making player able to move across storage containers without affecting it, *currently dissapears when moved over!*
		  if (map[Row][playerPosition + 1] == 'O') {
			splitRow.splice(playerPosition, 1, " ");
			splitRow.splice((playerPosition + 1), 1, "S");
			let joinRow = splitRow.join('');
			map[Row] = joinRow;
		  }
		  if (template[Row][playerPosition] === "O") {
			let row = map[Row].split("");
			row[playerPosition] = "O";
			map[Row] = row.join("");
		  }
		}
		makeGrid(map);
  
	  } else if (e.keyCode == 37) { //LEFT
		reset(gameBoard);
		for (Row = 0; Row < map.length; Row++) {
		  let splitRow = map[Row].split("");
		  let playerPosition = splitRow.indexOf("S");
		  if (playerPosition >= 0 && map[Row][playerPosition - 1] == "W") {
			break;
		  }
		  if (map[Row].includes("S") && map[Row][playerPosition - 1] == " ") {
			splitRow.splice(playerPosition, 1);
			splitRow.splice((playerPosition - 1), 0, "S");
			let joinRow = splitRow.join('');
			map[Row] = joinRow;
		  }
		  if (map[Row][playerPosition - 1] == "B" && map[Row][playerPosition - 2] !== "W" && map[Row][playerPosition - 2] !== "B") {
			splitRow.splice(playerPosition, 1, " ");
			splitRow.splice((playerPosition - 2), 2, "B", "S");
			let joinRow = splitRow.join('');
			map[Row] = joinRow;
		  }
		  // Making player able to move across storage containers without affecting it, not done
		  if (map[Row][playerPosition - 1] == "O") {
			splitRow.splice(playerPosition, 1);
			splitRow.splice((playerPosition - 1), 1, "S", " ");
			let joinRow = splitRow.join('');
			map[Row] = joinRow;
		  }
		  if (template[Row][playerPosition] === "O") {
			let row = map[Row].split("");
			row[playerPosition] = "O";
			map[Row] = row.join("");
		  }
		}
		makeGrid(map);
		leftPressed = true;
	  } else if (e.keyCode == 38) { //UP
		reset(gameBoard);
		for (Row = 0; Row < map.length; Row++) {
		  if (map[Row].includes("S")) {
			let aboveRow = map[Row - 1].split('');
			let aboveRow2 = map[Row - 2].split('');
			let splitRow = map[Row].split('');
			let playerPosition = splitRow.indexOf("S");
  
			if (playerPosition >= 0 && map[Row - 1][playerPosition] == "W") {
			  break;
			}
  
			if (map[Row - 1][playerPosition] == " " || map[Row - 1][playerPosition] == "" && map[Row - 2][playerPosition] !== "W") {
			  splitRow.splice(playerPosition, 1, " ");
			  aboveRow.splice((playerPosition), 1, "S");
			  let joinRow = splitRow.join('');
			  map[Row] = joinRow;
			  let joinRow2 = aboveRow.join('');
			  map[Row - 1] = joinRow2;
			  let newMap = map;
  
			} else if (map[Row - 1][playerPosition] == "B" && map[Row - 2][playerPosition] !== "W" && map[Row - 2][playerPosition] !== "B") {
			  splitRow.splice(playerPosition, 1, " ");
			  aboveRow.splice(playerPosition, 1, "S")
			  aboveRow2.splice(playerPosition, 1, "B");
			  let joinRow = splitRow.join('');
			  map[Row] = joinRow;
			  let joinRow2 = aboveRow.join('');
			  let joinRow3 = aboveRow2.join('');
			  map[Row - 1] = joinRow2
			  map[Row - 2] = joinRow3
			  let newMap = map;
			} else if (map[Row - 1][playerPosition] == "B" && map[Row - 2][playerPosition] == "W") {
			  break;
			}
  
			// Making player able to move across storage containers without affecting it.
			else if (map[Row - 1][playerPosition] == "O") {
			  splitRow.splice(playerPosition, 1, " ");
			  aboveRow.splice(playerPosition, 1, "S");
			  let joinRow = splitRow.join('');
			  joinRow2 = aboveRow.join('');
			  map[Row - 1] = joinRow2;
			  map[Row] = joinRow;
  
			}
			if (template[Row][playerPosition] === "O") {
			  let row = map[Row].split("");
			  row[playerPosition] = "O";
			  map[Row] = row.join("");
			}
		  }
		}
		makeGrid(map);
		upPressed = true;
	  } else if (e.keyCode == 40) { //DOWN
		reset(gameBoard);
		for (Row = 0; Row < map.length; Row++) {
		  if (map[Row].includes("S")) {
			let underRow = map[Row + 1].split('');
			let splitRow = map[Row].split('');
			let playerPosition = splitRow.indexOf("S");
  
			if (playerPosition >= 0 && map[Row + 1][playerPosition] == "W") {
			  break;
			}
  
			let underRow2 = map[Row + 2].split('');
			if (map[Row + 1][playerPosition] == " " || map[Row - 1][playerPosition] == "" && map[Row - 2][playerPosition] !== "W") {
			  splitRow.splice(playerPosition, 1, " ");
			  underRow.splice((playerPosition), 1, "S");
			  let joinRow = splitRow.join('');
			  map[Row] = joinRow;
			  let joinRow2 = underRow.join('');
			  map[Row + 1] = joinRow2;
  
  
			}
			if (map[Row + 1][playerPosition] == "B" && map[Row + 2][playerPosition] !== "W" && map[Row + 2][playerPosition] !== "B") {
			  splitRow.splice(playerPosition, 1, " ");
			  underRow.splice(playerPosition, 1, "S")
			  underRow2.splice(playerPosition, 1, "B");
			  let joinRow = splitRow.join('');
			  map[Row] = joinRow;
			  let joinRow2 = underRow.join('');
			  let joinRow3 = underRow2.join('');
			  map[Row + 1] = joinRow2
			  map[Row + 2] = joinRow3
			  let newMap = map;
			}
			if (map[Row + 1][playerPosition] == "B" && map[Row + 2][playerPosition] == "W") {
			  break;
			}
			// Making player able to move across storage containers without affecting it, not done
			if (map[Row + 1][playerPosition] == "O") {
			  splitRow.splice(playerPosition, 1, " ");
			  underRow.splice(playerPosition, 1, "S");
			  let joinRow = splitRow.join('');
			  joinRow2 = underRow.join('');
			  map[Row + 1] = joinRow2
			  map[Row] = joinRow;
			}
			if (template[Row][playerPosition] === "O") {
			  let row = map[Row].split("");
			  row[playerPosition] = "O";
			  map[Row] = row.join("");
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
  