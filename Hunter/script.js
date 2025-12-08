
const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = 4/3 * window.innerHeight * 0.82;
ctx.canvas.height = window.innerHeight * 0.82;

//creating base map
const width = canvas.width; 
const height = canvas.height;
const numCol = 31;
const numRow = 23;
const reservedDif = 10000;

var state = 0;

var potentialSpot = -1;

const img1 = new Image();
img1.src = "../Images/KorstianMap(1).jpg"

const img2 = new Image();
img2.src = "../Images/KorstianMap(2).jpg"

const reserveButton = document.getElementById("reserveCell");
const cancelButton = document.getElementById("cancelCell");
const map = document.getElementById("mapCanvas");
map.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(x > 0 && y > 0){
        const pos = Math.floor(x / (width / numCol)) + Math.floor(y / (height / numRow)) * numCol + reservedDif * (state);

        if (!reservedSpots.includes(pos) && !hunterSpots.includes(pos)){
            potentialSpot = pos;
        } else{
            potentialSpot = -1;
        }

        drawMap();
    }
});

async function addHunter(spot){
    
    const thisDate = (new Date()).toISOString().split("T")[0];
    
    const hunterRef = db
        .collection("reserved")
        .doc("hunters")
        .collection("dates")
        .doc(thisDate);

    await hunterRef.set({
        cells: firebase.firestore.FieldValue.arrayUnion(spot)
    }, { merge: true });

}

reserveButton.addEventListener("click", () => {
    if(potentialSpot * (state * -2 + 1) <= reservedDif * (state * -2 + 1) && potentialSpot >= 0){
        addHunter(potentialSpot);
        potentialSpot = -1;
        pullReserveSpots();
    }
});

cancelButton.addEventListener("click", () => {
    potentialSpot = -1;
    drawMap();
});

function updateTitle(timing){
    var mapTitle = document.getElementById("Map Title");
    if(potentialSpot * (state * -2 + 1) <= reservedDif * (state * -2 + 1) && potentialSpot >= 0){
        mapTitle.style.display = "none";
        reserveButton.style.display = "block";
        reserveButton.textContent = "Click Here To Reserve Your Cell";
        if (timing % 2 == 0){
            reserveButton.style.background = "rgb(200, 100, 100)";
        } else{
            reserveButton.style.background = "rgb(180, 70, 70)";
        }
    } else{
        mapTitle.style.display = "block";
        reserveButton.style.display = "none";
        if (state == 0){
            mapTitle.textContent = "Korstian Division";
        } else{
            mapTitle.textContent = "Durham Division";
        }
    }
}

function drawMap(){

    ctx.clearRect(0, 0, width, height);
        
    ctx.drawImage(state === 0 ? img1 : img2, 0, 0, width, height);
    //begin drawing and coloring cells
    ctx.beginPath();

    const reserveButton = document.getElementById("reserveCell");
    if(potentialSpot * (state * -2 + 1) <= reservedDif * (state * -2 + 1) && potentialSpot >= 0){
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
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);

                ctx.fillStyle = "rgba(200, 0, 0, 0.3)";
                ctx.beginPath();
                ctx.ellipse(width / numCol * (i + 0.5), height / numRow * (j + 0.5),
                    width / numCol * 3, height / numRow * 3, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    updateTitle(new Date().getSeconds());
}

img1.onload = function(){
    pullReserveSpots();
}

document.getElementById("nextMap").onclick = function setState(){
    state = (state + 1) % 2;
    drawMap();
}

function tick() {
  //get the mins of the current time
  var mins = new Date().getMinutes();
  if (mins == "00") {
    pullReserveSpots();
  }
}

setInterval(tick, 1000 * 30);

var i = 0;
function tickDraw() {
    i = (i + 1) % 2;
    updateTitle(i);
}

setInterval(tickDraw, 500);
