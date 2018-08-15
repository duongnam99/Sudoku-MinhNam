window.onload = showNewGame();

// Hàm kiểm tra xem trong mảng có 2 phần tử giống nhau không
function checkSameValueinArr(arrTemp){
	var count = 0;
	var check;
	for(let i=0; i<9; i++){
		if(arrTemp[i] != 0) {
			temp = arrTemp[i];
			for(let j=0; j<9; j++){
				if(temp == arrTemp[j]){
					count ++;
				}
			}
			if(count > 1) {
				return false;
			}else {
				count = 0; //  nếu không false thì đặt lại là 0 để tiếp tục dùng ở vòng lặp sau
				check = true;
			}
		}
	}
	return check;
}
// Kiểm tra hàng ,cột ,khối trưóc xem  ngưòi dùng có nhập các số trùng nhau hay không, nếu trùng nhau, trả về false và không chạy giải
function checkRowBeforeSolve(row,sudoku){
	var arrTemp = [];
	var count = 0;
	var check;
	for(let i=0; i<9; i++){
		arrTemp[i] = sudoku[row*9+i]; 
	}
	check = checkSameValueinArr(arrTemp);
	return check;
}
function checkColBeforeSolve(col,sudoku){
	var arrTemp = [];
	var count = 0;
	var check;
	for(let i=0; i<9; i++){
		arrTemp[i] = sudoku[col+i*9];
	}
	check = checkSameValueinArr(arrTemp);
	return check;
}
function checkBlockBeforeSolve(block,sudoku){
	var arrTemp = [];
	var count = 0;
	var check;
	for(let i=0; i<9; i++){
		arrTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	check = checkSameValueinArr(arrTemp);
	return check;
}

function returnRow(cell) {
	return Math.floor(cell / 9);
}
function returnCol(cell) {
	return cell % 9;
}
 
function returnBlock(cell) {
	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}
// Kiểm tra nếu trong hàng đã có số đưọc truyền vào thì trả về false
function isPossibleRow(number,row,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[row*9+i] == number) { 
			return false;
		}
	}
	return true;
}
// kiểm tra thỏa mãn cột
function isPossibleCol(number,col,sudoku) {
	for (var i=0; i<=8; i++) {
		if (sudoku[col+9*i] == number) {
			return false;
		}
	}
	return true;
}
// kiểm tra trong khối, nếu đã có số đưọc truyền thì trả về false
function isPossibleBlock(number,block,sudoku) {
	for (var i=0; i<9; i++) {
		if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
			return false;
		}
	}
	return true;
}
// KIÊM tra số truyền vào thỏa mãn 3 điều kiện về hàng, cột và khối
function isPossibleNumber(cell,number,sudoku) {
	var row = returnRow(cell);
	var col = returnCol(cell);
	var block = returnBlock(cell);
	return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku) && isPossibleBlock(number,block,sudoku);
}
function checkCanbeSolve(){
	var unSolved = getUnSolvedSudoku();
	for(let i = 0; i< 9; i++){
		if(checkRowBeforeSolve(i, unSolved) == false || checkColBeforeSolve(i, unSolved) == false || checkBlockBeforeSolve(i, unSolved) == false){
			return false;
		}
	}
	return true;
}
function isCorrectRow(row,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var rowTemp= new Array();
	for (var i=0; i<=8; i++) {
		rowTemp[i] = sudoku[row*9+i]; // truyền row đó vào một hàng tạm thời
	}
	rowTemp.sort(); // sắp xếp từ thấp đến cao
	return rowTemp.join() == rightSequence.join(); // chuyển mảng thành chuỗi, so sánh, nếu hàng đó có đủ các số từ 1 đến 9 thì trả về true
}
 // Tương tư, kiểm tra cột
function isCorrectCol(col,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var colTemp= new Array();
	for (var i=0; i<=8; i++) {
		colTemp[i] = sudoku[col+i*9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join(); 
}

function isCorrectBlock(block,sudoku) {
	var rightSequence = new Array(1,2,3,4,5,6,7,8,9);
	var blockTemp= new Array();
	for (var i=0; i<=8; i++) {
		blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join(); // check trong khối có đủ các số từ 1 đến 9

}
// kiểm tra xem sudoku đã đưọc giải chưa
function isSolvedSudoku(sudoku) {
	for (var i=0; i<=8; i++) {
		if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
			return false;
		}
	}
	return true;
}
// kiểm tra xem các số nào có thể đưọc điền vào ô, trả về mảng
function determinePossibleValues(cell,sudoku) {
	var possible = new Array();
	for (var i=1; i<=9; i++) {
		if (isPossibleNumber(cell,i,sudoku)) { // gọi hàm isPossibleNumber để kiểm tra xem số i có thỏa mãn các điều kiện về hàng, cột và khối
			possible.unshift(i); // thêm số vào đầu mảng
		}
	}
	return possible;
}

function determineRandomPossibleValue(possible,cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked]; // Chọn một số bất kì trong mảng lựa chọn
}
 
function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i=0; i<= 80; i++) {
		if (sudoku[i] == 0) { // nếu số chưa được điền ( mặc định là 0 ) 
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i,sudoku); // trả về mảng các số có thể điền đưọc 
			if (possible[i].length==0) {
				return false;
			}
		}
	}
	return possible; // trả về mảng 2 chiều với các gía trị có thể cho toàn bộ các vị trí chưa đưọc điền 
}
// truyền vào một mảng và một số, loại bỏ số đó khỏi mảng, trả về mảng mới
function removeAttempt(attemptArray,number) {
	var newArray = new Array();
	for (var i=0; i<attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}
// truyền mảng hai chiều (possible), chọn vị trí mà sàng lọc đưọc ít lựa chọn nhất
function nextRandom(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i=0; i <= 80; i++) {
		if (possible[i]!=undefined) { // ko phải vị trí nào cũng dc truyền value (scanSudokuForUnique) nên sẽ có một số là undefined
			if ((possible[i].length<=max) && (possible[i].length>0)) { // nếu tại vị trí này có mảng với số phần tử nhỏ hơn so với vị trí trưóc đó thì đặt lại max, chọn lại vị trí
				max = possible[i].length; 
				minChoices = i;
			}
		}
	}
	return minChoices;
}
// giải
function solve(sudoku) {
	var saved = new Array();
	var savedSudoku = new Array();
	var nextMove;
	var whatToTry;
	var attempt;
	while (!isSolvedSudoku(sudoku)) {
		nextMove = scanSudokuForUnique(sudoku); // trả về mảng 2 chiều với các gía trị có thể cho toàn bộ các vị trí chưa đưọc điền 
		if (nextMove == false) {
			nextMove = saved.pop(); 
			sudoku = savedSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);  // trả về vị trí với ít lựa chọn nhất
		attempt = determineRandomPossibleValue(nextMove,whatToTry); // chọn một số bất kì
		if (nextMove[whatToTry].length>1) { // nếu mảng lựa chọn có nhiều hơn 1 số
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt); // loại bỏ số đã đưọc chọn bất kì khỏi mảng
			saved.push(nextMove.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt; // truyền số đưọc chọn vào vị trí đó, kết thúc 1 lần lặp, nếu isolvedSudoku(sudoku) chưa trả về true, vòng lặp tiếp tục
	}
	return sudoku;
}
function randomArray(cellCount){
	var i = 0;
	var arrayPosition = [];
	while(i < cellCount) {
		i++;
		var rdNumber = Math.floor(Math.random()*81); 
		arrayPosition.unshift(rdNumber); // thêm vào đầu mảng
		// Nếu số đưọc tạo trùng số đã có thì bỏ số đó ra và làm lại 
		for(let x = 1; x < arrayPosition.length; x++) {
			if(arrayPosition[x] == rdNumber){
				i--;
				arrayPosition.shift(rdNumber);
			}
		}
	}
	return arrayPosition.sort(function(a, b){return a-b}); // sắp lại từ bé đến lớn
}

function getcellCount(){
	var cellCount = document.getElementById('cellCount').value;
	return cellCount;
}
data = [];

function showNewGame(){

	document.getElementById('mess').classList.add('hide');
	document.getElementById('solve').disabled = false;
	document.getElementById('pause').disabled = true;
	document.getElementById('continue').disabled = true;
	document.getElementById('sleepTime').disabled = false;
	document.getElementById('reset').disabled = true;

	document.getElementById('mess4').classList.add('hide');
	document.getElementById('mess5').classList.add('hide');
	document.getElementById('mess7').classList.add('hide');
	document.getElementById('mess6').classList.add('hide');

	clearMess();
	
	var cellCount = getcellCount();

	if(cellCount < 1 || cellCount > 80 || isNaN(cellCount)){
		document.getElementById('mess4').classList.remove('hide');
		return false;
	}
	for(let x = 0; x < 81; x++) {
		var cell = document.getElementById(x.toString());
		cell.value = '';
		cell.disabled = false;
	}
	var arrPosition = randomArray(cellCount);
	var sudoku = [];
	for(let k = 0; k<81; k++){
		sudoku.push(0); // Tạo mảng ban đầu
	}
	data = solve(sudoku);

	let i = 0; 	
	while(i < data.length){
		for(j=0; j< arrPosition.length; j++){
			if(arrPosition[j] == i){
				cell = document.getElementById(i.toString());
				cell.value = data[i];
				cell.disabled = true;
			}
		}
		i++;
	}
	unSolvedSudoku = getUnSolvedSudoku();
}

function getUnSolvedSudoku(){
	var unSolved = [];
	for(let i = 0; i < 81; i++){
		var cell = document.getElementById(i.toString());
		
		if(!isNaN(Number(cell.value))){ // nếu trong ô là số
			unSolved.push(Number(cell.value));

		}else {
			unSolved.push(0);
		}
	}
	return unSolved;
}

function check(){
	document.getElementById('mess').classList.add('hide');
	document.getElementById('mess7').classList.add('hide');
	document.getElementById('mess6').classList.add('hide');
	// console.log('nam');
	var check1 = true;
	var check2 = false;
	var userSudoku = [];
	// Check lỗi thao tác
	for(let i=0; i<81; i++){
		usercell = document.getElementById(i.toString()).value;
		usercell = Number(usercell); // đưa về dạng số đề check
		// console.log(usercell);
		if(usercell < 1 || usercell > 9 || isNaN(usercell) || usercell % 1 != 0){
			check1 = false;
			document.getElementById('mess1').classList.remove('hide');
			document.getElementById('mess2').classList.add('hide');
			document.getElementById('mess3').classList.add('hide');
			break;
		}
		userSudoku[i] = usercell;
	}
	// check logic
	if(check1 == true) {
		for(let i = 0; i < 81; i++){
			var tempUserSuduku =  userSudoku;
			tempUserSuduku[i] = 0; // chuyền thành 0 để tiến hành kiểm tra hàng, cột ,khối (so sánh với các số khác trong hàng cột, khối, nếu vẫn gĩư => trùng =>trả về flase)
			var number = document.getElementById(i.toString()).value;
			number = Number(number);
			check2 = isPossibleNumber(i, number, tempUserSuduku); // kiểm tra xem ô đó có thỏa mãn 3 điều kiện về hàng, cột, khối
			tempUserSuduku[i] = number;
			if(check2 == false) {
				document.getElementById('mess1').classList.add('hide');
				document.getElementById('mess3').classList.add('hide');
				document.getElementById('mess2').classList.remove('hide');
				break;
			}
		}
	}
	
	// console.log(check2);
	if(check1 == true && check2 == true){
		document.getElementById('mess1').classList.add('hide');
		document.getElementById('mess2').classList.add('hide');
		document.getElementById('mess3').classList.remove('hide');
	}
}
function showSolve(){
	for(let i=0; i<81; i++){
		document.getElementById(i.toString()).value = data[i];
	}
}

var unSolvedSudoku = [];
var saved = new Array();
var savedSudoku = new Array();
var nextMove;
var whatToTry;
var attempt;
var time;

function stepSolve(){
	document.getElementById('pause').disabled = false;
	document.getElementById('continue').disabled = true;
	document.getElementById('create_game').disabled = true;

	document.getElementById('mess7').classList.add('hide');
	document.getElementById('mess6').classList.add('hide');
	document.getElementById('mess5').classList.add('hide');
	
	pause = false;	
	unSolvedSudoku = getUnSolvedSudoku();
	var check = checkCanbeSolve();
	if(check == false) {
		document.getElementById('mess6').classList.remove('hide');
		return false;
	}

	time = document.getElementById('sleepTime').value;
	time = Number(time)*1000;

	if(time < 0 || isNaN(time)){
		document.getElementById('mess5').classList.remove('hide');
		return false;
	}

	loop(time);
}
function loop(time){
	setTimeout(function () {
	   	nextMove = scanSudokuForUnique(unSolvedSudoku); // trả về mảng 2 chiều với các gía trị có thể cho toàn bộ các vị trí chưa đưọc điền 
		if (nextMove == false) {
			nextMove = saved.pop(); 
			unSolvedSudoku = savedSudoku.pop();
		}
		if(nextMove == undefined) {
			document.getElementById('mess7').classList.remove('hide');
			document.getElementById('create_game').disabled = false;

			return false;
		}
		whatToTry = nextRandom(nextMove);  // trả về vị trí với ít lựa chọn nhất
		attempt = determineRandomPossibleValue(nextMove,whatToTry); // chọn một số bất kì
		if (nextMove[whatToTry].length > 1) { // nếu mảng lựa chọn có nhiều hơn 1 số
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry],attempt); // loại bỏ số đã đưọc chọn bất kì khỏi mảng
			saved.push(nextMove.slice()); // Lưu lại, nếu số được chọn là sai -> scan trả về false -> xóa 
			savedSudoku.push(unSolvedSudoku.slice());
		}		
		unSolvedSudoku[whatToTry] = attempt; // truyền số đưọc chọn vào vị trí đó, kết thúc 1 lần lặp, nếu isolvedSudoku(sudoku) chưa trả về true, vòng lặp tiếp tục
		
		document.getElementById(whatToTry.toString()).value = unSolvedSudoku[whatToTry];
		// console.log(whatToTry+'-'+ attempt);
		if(!isSolvedSudoku(unSolvedSudoku) && pause == false && nextMove != undefined) { 
		 	loop(time);
		 	document.getElementById('sleepTime').disabled = true;
			document.getElementById('reset').disabled = true;
			document.getElementById('solve').disabled = true;
			document.getElementById('create_game').disabled = true;

		}else if(isSolvedSudoku(unSolvedSudoku)){
			document.getElementById('reset').disabled = false;
			document.getElementById('sleepTime').disabled = false;
			document.getElementById('create_game').disabled = false;
			document.getElementById('mess').classList.remove('hide');
			document.getElementById('mess1').classList.remove('hide');
			document.getElementById('mess5').classList.remove('hide');
			document.getElementById('mess6').classList.remove('hide');
			document.getElementById('mess7').classList.remove('hide');

		}else if(pause == true) {
			document.getElementById('sleepTime').disabled = true;
			document.getElementById('reset').disabled = false;
			document.getElementById('continue').disabled = false;
		}
	}, time);
}
function reset(){
	unSolvedSudoku = getUnSolvedSudoku(); // đưa mảng về ban đầu
	for(let i = 0; i < 81; i++){
		var cell = document.getElementById(i.toString());
		if(cell.disabled == false) {
			cell.value = '';
		}
	}
	document.getElementById('mess').classList.add('hide'); // xóa thông báo
	document.getElementById('pause').disabled = true;
	document.getElementById('continue').disabled = true;
	document.getElementById('solve').disabled = false;
	document.getElementById('sleepTime').disabled = false;

	document.getElementById('mess7').classList.add('hide');
	document.getElementById('mess6').classList.add('hide');
	document.getElementById('mess5').classList.add('hide');

	clearMess();
}
var pause = false;
function Pause(){
	document.getElementById('create_game').disabled = false;
	pause = true;
}
function Continue(){
	pause = false;
	document.getElementById('continue').disabled = true;
	loop(time);
}
function clearMess(){
	document.getElementById('mess1').classList.add('hide');
	document.getElementById('mess2').classList.add('hide');
	document.getElementById('mess3').classList.add('hide');	
}
function isNumber1(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
        return false;
    }
    return true;
}
function isNumber2(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
// console.log(Number('3+'));
