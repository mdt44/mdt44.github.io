
var reservedSpots = [];
var hunterSpots = [];

var testSpots = [10, 20, 30, 40,
            10021, 10054, 10142]; //testing of researcher reservations

async function pullReserveSpots(){

    const thisDate = (new Date()).toISOString().split("T")[0];;

    console.log("yep it ran again");

    const researchRef = db
        .collection("reserved")
        .doc("researchers")
        .collection("dates")
        .doc(thisDate);
    const snap = await researchRef.get();
    const cells = snap.data()?.cells;

    const hunterRef = db
        .collection("reserved")
        .doc("hunters");
    const snapH = await hunterRef.get();
    const cellsH = snapH.data()?.cells;

    reservedSpots = [];
    (cells ?? []).forEach(value => reservedSpots.push(value));

    hunterSpots = [];
    (cellsH ?? []).forEach(value => hunterSpots.push(value));

    drawMap();

}
