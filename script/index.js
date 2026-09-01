const ID = document.getElementById("hunterId");
const NAME = document.getElementById("hunterName");
const LOGIN = document.getElementById("login");

LOGIN.addEventListener("click", () => {
    if(ID.value >= 1 && ID.value <= 99){
        checkInitial(ID.value, NAME.value);
    }
});

async function checkInitial(number, initial, date = new Date()){
    
    const hunterIDRef = db
        .collection("reserved")
        .doc("hunters")
        .collection("hunterID")
        .doc("h" + number);
    
    var snap = await hunterIDRef.get();
    var hunterID = await snap.data()?.initial;

    console.log(number);
    console.log(initial);
    console.log(hunterID);
    
    if(hunterID === initial){
        hID = number;
        sessionStorage.setItem("hunterID", hID);
        
        const thisDate = typeof date === "string" ? date : getLocalDateKey(date);

        const hunterSpotsRef = db
            .collection("reserved")
            .doc("hunters")
            .collection("hunterID")
            .doc("h" + hID)
            .collection("dates")
            .doc(thisDate);

        const hunterSpotsSnap = await hunterSpotsRef.get();
        const cells = hunterSpotsSnap.data()?.cells;
        thisHunterSpots = Array.isArray(cells) ? cells : [];

        sessionStorage.setItem("id", ID);
        sessionStorage.setItem("name", INITIAL);
        if(thisHunterSpots.length > 0){
            window.location.href = "choose.html";
        } else{
            window.location.href = 'quadrants.html';
        }
    }
}

