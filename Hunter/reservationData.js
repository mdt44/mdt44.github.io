
var reservedSpots = [15];
var hunterSpots = [];

var testSpots = [10, 20, 30, 40,
            10021, 10054, 10142]; //testing of researcher reservations

async function pullReserveSpots(){

    console.log(1);

    /*db.collection("reserved").doc("hunters").collection("cells").get().then((querySnapshot) =>
        querySnapshot.forEach(() =>
            reservedSpots.push(querySnapshot);

    );*/
    const ref = doc(db, "collectionName", "docId");
    const snap = await getDoc(ref);

    /*if (snap.exists()) {
        const data = snap.data();
        const myArray = data.myArrayField; // <-- now your array is equal to Firestore array
        console.log(myArray);
    }*/

    console.log(1);

    for (var i = 0;i < testSpots.length;i++){
        reservedSpots.push(testSpots[i]);
    }

    drawMap();

}
