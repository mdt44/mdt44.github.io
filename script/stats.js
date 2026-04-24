if(!sessionStorage.getItem("id")){
    window.location.href = "index.html";
}

const NAMEID = document.getElementById("nameId");
const CAUGHT = document.getElementById("caught");
const BUCKS = document.getElementById("bucks");
const HOURS = document.getElementById("hours");
const BACK = document.getElementById("back");

NAMEID.textContent = sessionStorage.getItem("name") + " (#" + sessionStorage.getItem("id") + ")";

async function pullData(){

    const doc = await db
        .collection("data")
        .doc(String(sessionStorage.getItem("id")))
        .get();

    CAUGHT.textContent = "Total Caught: " + doc.data()["Caught"];
    BUCKS.textContent = "Bucks Caught: " + doc.data()["Bucks"]
    HOURS.textContent = "Hours Hunted: " + doc.data()["Hours"];

}

pullData();

BACK.addEventListener("click", () => {
    window.location.href = "choose.html";
});
