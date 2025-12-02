
var reservedSpots = [];
var hunterSpots = [];

async function pullReserveSpots(){

    const thisDate = (new Date()).toISOString().split("T")[0];

    const researchRef = db
        .collection("reserved")
        .doc("researchers")
        .collection("dates")
        .doc(thisDate);
    const snap = await researchRef.get();
    const cells = snap.data()?.cells;

    const hunterRef = db
        .collection("reserved")
        .doc("hunters")
        .collection("dates")
        .doc(thisDate);
    const snapH = await hunterRef.get();
    const cellsH = snapH.data()?.cells;

    reservedSpots = [];
    (cells ?? []).forEach(value => reservedSpots.push(value));

    hunterSpots = [];
    (cellsH ?? []).forEach(value => hunterSpots.push(value));

    drawMap();

}
