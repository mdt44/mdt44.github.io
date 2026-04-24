if(!sessionStorage.getItem("id")){
    window.location.href = "index.html";
}

const KORSTIAN = document.getElementById("korstian");
const DURHAM = document.getElementById("durham");

KORSTIAN.addEventListener("click", () => {
    sessionStorage.setItem("quad", "korstian");
    window.location.href = "quadrants.html";
});

DURHAM.addEventListener("click", () => {
    sessionStorage.setItem("quad", "durham");
    window.location.href = "quadrants.html";
});
