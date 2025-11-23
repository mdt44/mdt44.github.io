
var reservedSpots = [];

async function pullReserveSpots(){

    console.log("yep it ran again");

    const thisDate = document.getElementById("userDate").value;
    
    const researchRef = db
        .collection("reserved")
        .doc("researchers")
        .collection("dates")
        .doc(thisDate);
    const snap = await researchRef.get();
    const cells = snap.data()?.cells;

    reservedSpots = [];
    (cells ?? []).forEach(value => reservedSpots.push(value));

    drawMap();

}
