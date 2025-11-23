
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

//creating base map
const width = canvas.width; 
const height = canvas.height;
const numCol = 31;
const numRow = 23;
const reservedDif = 10000;

var reservedSpots = [];
var hunterSpots = [];

var state = 0;
        
for (var i = 0;i < testSpots.length;i++){
    reservedSpots.push(testSpots[i]);
}

var potentialSpot = -1;

const img1 = new Image();
img1.src = "../Images/KorstianMap(1).jpg"

const img2 = new Image();
img2.src = "../Images/KorstianMap(2).jpg"

const reserveButton = document.getElementById("reserveCell");
const map = document.getElementById("mapCanvas");
map.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x);
    console.log(y);
    if(x > 0 && y > 0){
        const pos = Math.floor(x / (width / numCol) - 0.5) + Math.floor(y / (height / numRow) - 0.5) * numCol + reservedDif * (state);

        if (!reservedSpots.includes(pos) && !hunterSpots.includes(pos)){
            potentialSpot = pos;
        } else{
            potentialSpot = -1;
        }

        drawMap();
    }
});

reserveButton.addEventListener("click", () => {
    if(potentialSpot > reservedDif * (state)){
        hunterSpots.push(potentialSpot);
        potentialSpot = -1;
        drawMap();
    }
});

function drawMap(){
    ctx.clearRect(0, 0, width, height);
        
    ctx.drawImage(state === 0 ? img1 : img2, 0, 0, width, height);
    //begin drawing and coloring cells
    ctx.beginPath();

    const reserveButton = document.getElementById("reserveCell");
    if(potentialSpot > reservedDif * (state)){
        reserveButton.style.cursor = "pointer";
        reserveButton.style.background = "#04AA6D";
    } else{
        reserveButton.style.cursor = "not-allowed";
        reserveButton.style.background = "#898b8a";
    }

    for(var i = 0;i < numCol;i++){
        for(var j = 0;j < numRow;j++){
                
            ctx.strokeRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);

            var loc = i + j * numCol + reservedDif * (state);
            if (reservedSpots.includes(loc)){
                ctx.fillStyle = "red";
                ctx.fillRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);
            } else if(hunterSpots.includes(loc)){
                ctx.fillStyle = "black";
                ctx.fillRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);
            } else if (potentialSpot === loc){
                ctx.fillStyle = "rgba(150, 0, 0, 0.5)";
                ctx.fillRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);

                ctx.fillStyle = "rgba(200, 0, 0, 0.3)";
                ctx.beginPath();
                ctx.ellipse(width / numCol * (i + 0.5), height / numRow * (j + 0.5),
                    width / numCol * 3, height / numRow * 3, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}

img1.onload = function(){
    drawMap();
}
img2.onload = function(){
    drawMap();
}

document.getElementById("nextMap").onclick = function setState(){
    state = (state + 1) % 2;
    drawMap();
}
