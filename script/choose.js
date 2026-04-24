if(!sessionStorage.getItem("id")){
    window.location.href = "index.html";
}

const GREETING = document.getElementById("greeting");
const CHECKIN = document.getElementById("checkIn");
const CHECKOUT = document.getElementById("checkOut");
const VIEWSTATS = document.getElementById("viewStats");

//GREETING.textContent = "Welcome " + sessionStorage.getItem("name") + "!";

CHECKIN.addEventListener("click", () => {
    window.location.href = "division.html";
});

CHECKOUT.addEventListener("click", () => {
    window.location.href = "checkout.html";
});

VIEWSTATS.addEventListener("click", () => {
    window.location.href = "stats.html";
});

