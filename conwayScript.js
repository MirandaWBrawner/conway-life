let width = 200;
let height = 200;
let margin = 0;
let map = document.getElementById("map")
let cells = [];
let offsets = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];

function setup() {
	for (let row = 0; row < height + 2 * margin; row++) {
		cells[row] = [];
		for (let col = 0; col < width + 2 * margin; col++) {
			cells[row][col] = (Math.random() < 0.5);
		}
	}
	updateBoard();
}

function updateBoard() {
	let content = "";
	for (let row = margin; row < height + margin; row++) {
		content += "<tr>";
		for (let col = margin; col < width + margin; col++) {
			let className = cells[row][col] ? "liveTile" : "deadTile";
			content += `<td class='${className}' id='r${row}c${col}' onclick='changeCell(${row}, ${col})'></td>`;
		}
		content += "</tr>";
	}
	map.innerHTML = content;
}

function clearMap() {
	console.log("In clear function");
	for (row = 0; row < height + 2 * margin; row++) {
		for (col = 0; col < width + 2 * margin; col++) {
			cells[row][col] = 0;
		}
	}
	updateBoard();
}

function changeCell(row, col) {
	cells[row][col] = 1 - cells[row][col];
	updateBoard();
}



function go() {
	let nextTurn = [];
	for (let row = 0; row < height + 2 * margin; row++) {
		nextTurn[row] = [];
		for (let col = 0; col < width + 2 * margin; col++) {
			let sum = 0;
			for (let pair of offsets) {
				let newRow = pair[0] + row;
				let newCol = pair[1] + col;
				if (newRow >= 0 & newRow < height + 2 * margin & newCol >= 0 & newCol < width + 2 * margin) {
					sum += cells[newRow][newCol];
				}
			}
			if (sum === 3) {
				nextTurn[row][col] = 1
			} else if (sum === 2 & cells[row][col]) {
				nextTurn[row][col] = 1;
			} else {
				nextTurn[row][col] = 0;
			}
		}
	}
	for (let row = 0; row < height + 2 * margin; row++) {
		for (let col = 0; col < width + 2 * margin; col++) {
			cells[row][col] = nextTurn[row][col];
		}
	}
	updateBoard();
}