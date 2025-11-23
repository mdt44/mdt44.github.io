
var reservedSpots = [];

var testSpots = [10, 20, 30, 40,
            10021, 10054, 10142]; //testing of researcher reservations

async function pullReserveSpots(){

    console.log("yep it ran again");

    const researchRef = db
        .collection("reserved")
        .doc("researchers");
    const snap = await researchRef.get();
    const cells = snap.data()?.cells;

    reservedSpots = [];
    (cells ?? []).forEach(value => reservedSpots.push(value));

    drawMap();

}
