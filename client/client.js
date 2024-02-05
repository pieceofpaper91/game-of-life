matrix = []
const socket = io();
function main(){
    console.log('ready to display GoL...');

    function gotMatrix(data){
        // console.log(data);
        matrix = data;
    }
    socket.on('matrix', gotMatrix);

}
addRed = 0
addGreen = 0
addBlue = 0
function blockButton(){
    document.getElementById("rot".disabled) = true
}
function quadrat(zeile, spalte, sw) {
    if (sw === 1) {
        fill(111 + addRed,194 + addGreen,118+addBlue)
    } else if (sw === 2) {
        fill(236 + addRed, 100 + addGreen, 75+addBlue)
    } else if (sw === 3) {
        fill(0 + addRed,255,0+addBlue)
    } else if (sw === 4) {
        fill(255, 182 + addGreen, 193+addBlue)
    } else if (sw === 5) {
        fill(0 + addRed, 100 + addGreen, 0+addBlue)
    } else {
        fill(255,244,155+addBlue)
    }
    let seite = 13;
    rect( spalte * seite,zeile *seite, seite, seite)
};

function setup() {
    createCanvas(1700, 1400);  
    frameRate(60);
}
function draw() {
    noStroke()
    //console.log(matrix.length,matrix[0].length)
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            //console.log(j)
            quadrat(i, j, matrix[i][j])
        }
    }
}
raining = 0
function rain(){
    if(raining == 0){
        document.getElementById("rot").disabled = true
        document.getElementById("snow").disabled = true
        addBlue = 30
        raining++
    }
    else{
        document.getElementById("rot").disabled = false
        document.getElementById("snow").disabled = false
        addBlue = 0
        raining--
    }
}
snowing = 0
function snow(){
    if (snowing == 0) {
        document.getElementById("rain").disabled = true
        addBlue = 40
        addGreen = 40
        addRed = 40
        snowing++
        socket.emit('snowON', snow);
    } else {
        document.getElementById("rain").disabled = false
        addBlue = 0
        addGreen = 0
        addRed = 0
        snowing--
        socket.emit('snowOFF', 2);
    }
}
pause = 0
function togglePause(){
    pause = !pause
	socket.emit("pause", pause)
}
function infect(){
    const socket = io();
    console.log("s")
    socket.emit("infect", 1)

}

window.onload = main