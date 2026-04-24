if(!sessionStorage.getItem("id")){
    window.location.href = "index.html";
}

if(!sessionStorage.getItem("quad")) {
    window.location.href = "choose.html"
}

const numOfSubMaps = 6;
const mapLocations = {
    korstian: "../images/mapKorstian.jpg",
    durham: "../images/mapKorstian.jpg"
}

const division = sessionStorage.getItem("quad");

document.documentElement.style.setProperty("--mapDir", `url("${mapLocations[division]}")`);
document.getElementById("greeting").innerText = `${division.charAt(0).toUpperCase() + division.slice(1)} Division`; // Capitalize first letter of division

const grid = document.getElementById("quadrantSelector");
const backButton = document.getElementById("backButton");

let pieces = []
for (let i = 0; i < numOfSubMaps; i++) {
    pieces.push(document.createElement("div"));
    pieces[i].id = `p${i + 1}`;
    pieces[i].classList.add("piece");
    pieces[i].classList.add(`p${i + 1}`);
    
    let subText = document.createElement("p");
    subText.textContent = `${i + 1}`;
    subText.className = "pieceText";

    pieces[i].appendChild(subText);
}

pieces.forEach((piece) => {
    grid.appendChild(piece);
    piece.addEventListener("click", () => {
        sessionStorage.setItem("mapPiece", piece.id);
        window.location.href = "map.html";
    })
});

backButton.addEventListener("click", () => {
    window.location.href = "division.html";
})
