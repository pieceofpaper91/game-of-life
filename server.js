

const Gras = require("./classes/gras.js");
const RasenDestroyer = require("./classes/rasendestroyer.js");
const virus = require("./classes/virus.js");

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

let clients = [];
let isGameRunning = false;
let interValID;

speed = 100

app.use(express.static('./client'));

app.get('/', function (req, res){
    res.redirect('index.html');
});

server.listen(3000, function (){
    console.log("Der Server läuft auf port 3000...");

    io.on('connection', function(socket){
        console.log('ws connection established...');
        clients.push(socket.id);
        // Spielstart - NEU
        if(clients.length == 1 && isGameRunning == false){
            console.log("Starte Spiel... wenn noch nicht gestartet...");
            initGame();
            interValID= setInterval(updateGame, speed);
            isGameRunning = true;
        }

        socket.on('infect', infect);
        socket.on("snowON", snowOn);
        socket.on("snowOFF", snowOFF)
		socket.on("pause", pause)
        // Verhalten wenn Clients verlassen
        socket.on('disconnect', function(){
            console.log('client left...');
            const foundIndex = clients.findIndex(id => id === socket.id);
            if(foundIndex >= 0){
                clients.splice(foundIndex, 1);
            } 
            if(clients.length === 0){
                isGameRunning = false;
                clearInterval(interValID);  
                console.log("Spiel gestoppt: keine Clients", clients.length); 
            }
        });
    });

    
   
});
matrix = []

GrasArr = [];
RasenDestroyerArr = [];
VirusArr =[];
blockNewGras = false;
buttonlocked = false
blockAll = false

function erstelleMatrix(zeile, spalte){
    let matrix = [];
    for(let y = 0; y <= spalte; y++){
        matrix.push([]);
        for(let x = 0; x <= zeile; x++){
            matrix[y][x] = 0;
        }
    }
    return matrix;
}

function initGame(){
    console.log('init game....');
    matrix = erstelleMatrix(50,50);
    GrasArr.push(new Gras(25,25));
    GrasArr.push(new Gras(24,25));
    GrasArr.push(new Gras(25,25));
    GrasArr.push(new Gras(1,25));
    GrasArr.push(new Gras(25,10));
    GrasArr.push(new Gras(24,30));
    RasenDestroyerArr.push(new RasenDestroyer(24,24));
    VirusArr.push(new virus(21,30));
	VirusArr.push(new virus(23,30));
	VirusArr.push(new virus(21,40));
	VirusArr.push(new virus(25,30));
	VirusArr.push(new virus(26,30));
}

function pause(block) {
    blockAll = block == 1
	if (blockAll) {
		for(let i = 0; i < GrasArr.length; i++){
            let GrasObj = GrasArr[i];
            console.log(GrasObj);
        }
		console.log(globalEnergy,frequency);
	}
}

function infect() {
    blockNewGras = true;
    buttonlocked = true;
    console.log("infect called");
    for(let i = 0; i < GrasArr.length; i++){
        GrasArr[i].stateChange();
    };
    blockNewGras = false;
    io.sockets.emit('matrix', matrix);
}
frequency = 1
globalEnergy = 1
function snowOn(){
    frequency = 10
    console.log("good")
}
function snowOFF(){
    frequency = 1
    console.log("good")
}
function updateGame(){

	if (blockAll) {
		return
	}
    if(globalEnergy >= frequency){
        for(let i = 0; i < VirusArr.length; i++){
            let VirusObj = VirusArr[i];
            VirusObj.spielzug();
        }
        for(let i = 0; i < RasenDestroyerArr.length; i++){
            let RasendestroyerObj = RasenDestroyerArr[i];
            RasendestroyerObj.spielzug();    
        }
        for(let i = 0; i < GrasArr.length; i++){
            let GrasObj = GrasArr[i];
            GrasObj.zug();
        }
    
        io.sockets.emit('matrix', matrix);
        globalEnergy = 1
    }
    else{
        globalEnergy++
    }
}