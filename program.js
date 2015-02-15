function programmingSetup() {
  sheet[0] = new Array(sheetH);
  reset(sheet, 9, false);
  clear(c);
}

function clickReporter(e) {
  var mousePos = getMousePos(c, e);
  i = Math.floor((mousePos.x - workplace[0])/(2*radius));
  j = Math.floor((mousePos.y - workplace[1])/(2*radius));
  if ((i > sheetW - 1) || (j > sheetH - 1) || (i < 0) || (j < 0)) return;
  sheet[i][j] += 1;
  if (sheet[i][j] == 10) {sheet[i][j] = 0;}
  if (sheet[i][j] == 1) {sheet[i][j] = 8;}
  draw(sheet, c, workplace);
}

var cutSheet = function(){
	for (var i = 0; ; i++){
		b = 1;
		for (var j = 0; j < sheetH - 1; j++){
			if (sheet[i][j] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var k = sheetW - 1; ; k--){
		b = 1;
		for (var j = 0; j < sheetH - 1; j++){
			if (sheet[k][j] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var p = 0; ; p++){
		b = 1;
		for (var j = 0; j < sheetW - 1; j++){
			if (sheet[j][p] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var s = sheetH - 1; ; s--){
		b = 1;
		for (var j = 0; j < sheetW - 1; j++){
			if (sheet[j][s] != 0) { b = 0; }
		}
		if (b == 0) {break;}
	}
	for (var r = 0; r < sheetW - 1; r++){
		sheet[r] = sheet[r].slice(p,s+1)
	}
	sheet = sheet.slice(i,k+1);
	return [k+1-i,s+1-p];
}	  
	  
var saveSheet = function(){
	var a = cutSheet();
	clear(cv);
	draw(sheet,cv);
	a.push(detectTile());
	program.push([sheet, a]);
	sheet = new Array(sheetW);
	sheet[0] = new Array(sheetH + 1);
	reset(sheet);
	clear(c);
	nOfSheets += 1;
}

var test = function(){
	width = fieldW * 25;
	height = fieldH * 25;
	c.width = width;
	c.height = height;
	newGame();
	GameLoop();
}

var findPosition = function(){
	var sh, bool;
	var WofSh;
	var HofSh;
	for (i = 0; i < NofSheets; i++){
		if (program[i][1][2] != NofTile) {continue;}
		sh = program[i][0];
		WofSh = program[i][1][0];
		HofSh = program[i][1][1];
		for (var k = 0; k < FieldW - WofSh; k++){
			for (var l = 0; l < FieldH - HofSh; l++){
				bool = 1;
				for (var m = 0; m < WofSH; m++){
					for (var n = 0; n < HofSH; n++){
						if (sh[m][n] != field[k+m][l+n]) {bool = 0;}
					}	
				}
				if (bool == 1) {return k;}
			}	
		}
	}
	return 0;
}
