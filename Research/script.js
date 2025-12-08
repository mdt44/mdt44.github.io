
if(checkPassword(sessionStorage.getItem("passwordSaved")) !== true){
    //window.location.replace("https://mdt44.github.io/Password/password.html");
}

const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = 4/3 * window.innerHeight * 0.75;
ctx.canvas.height = window.innerHeight * 0.75;

var date = new Date();

//creating base map
const width = canvas.width; 
const height = canvas.height;
const numCol = 31;
const numRow = 23;
const reservedDif = 10000;

var state = 0;

var potentialSpots = [];

const img1 = new Image();
img1.src = "../Images/KorstianMap(1).jpg"

const img2 = new Image();
img2.src = "../Images/KorstianMap(2).jpg"

const reserveButton = document.getElementById("reserveCell");
const clearButton = document.getElementById("clearReserve");
const map = document.getElementById("mapCanvas");

map.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(x > 0 && y > 0){
        const pos = Math.floor(x / (width / numCol)) + Math.floor(y / (height / numRow)) * numCol + reservedDif * (state);

        if (!reservedSpots.includes(pos) && !potentialSpots.includes(pos)){
            potentialSpots.push(pos);
        }

        drawMap();
    }
});

async function addResearch(spots){

    const thisDate = document.getElementById("userDate").value;

    const researchRef = db
        .collection("reserved")
        .doc("researchers")
        .collection("dates")
        .doc(thisDate);

    await researchRef.set({
        cells: firebase.firestore.FieldValue.arrayUnion(...spots)
    }, { merge: true });
}

reserveButton.addEventListener("click", () => {
    if (potentialSpots.length > 0){
        addResearch(potentialSpots);
        potentialSpots = [];
        const thisDate = document.getElementById("userDate").value;
        pullReserveSpots(thisDate);
    }
});

clearButton.addEventListener("click", () => {
    potentialSpots = [];
    drawMap();
});

function updateTitle(timing){
    var mapTitle = document.getElementById("Map Title");
    if(potentialSpots.length > 0){
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

    for(var i = 0;i < numCol;i++){
        for(var j = 0;j < numRow;j++){
                
            ctx.strokeRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);

            var loc = i + j * numCol + reservedDif * (state);
            if (reservedSpots.includes(loc)){
                ctx.fillStyle = "red";
                ctx.fillRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);
            } else if (potentialSpots.includes(loc)){
                ctx.fillStyle = "rgba(150, 0, 0, 0.5)";
                ctx.fillRect(width / numCol * i, height / numRow * j, width / numCol, height / numRow);

                ctx.fillStyle = "rgba(200, 0, 0, 0.05)";
                ctx.beginPath();
                ctx.ellipse(width / numCol * (i + 0.5), height / numRow * (j + 0.5),
                    width / numCol * 2, height / numRow * 2, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}

document.getElementById("nextMap").onclick = function setState(){
    state = (state + 1) % 2;
    drawMap();
}

img1.onload = function(){
    pullReserveSpots();
}

var i = 0;
function tickDraw() {
    i = (i + 1) % 2;
    updateTitle(i);
}

setInterval(tickDraw, 500);

