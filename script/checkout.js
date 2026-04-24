const BUCKS = document.getElementById("bucks");
const DOE = document.getElementById("doe");
const BUTTONBUCKS = document.getElementById("buttonBucks");
const TOTALCAUGHT = document.getElementById("totalCaught");
const CHECKOUT = document.getElementById("checkout");

var total = 0;

function updateTotal(){
    total = Number(BUCKS.value) + Number(DOE.value) + Number(BUTTONBUCKS.value);
    TOTALCAUGHT.textContent = "Total Caught: " + total;
}

async function updateData(){

    console.log(String(sessionStorage.getItem("id")));

    const doc = await db
        .collection("hunters")
        .doc(String(sessionStorage.getItem("id")));
   
    const data = (await doc.get()).data();

    const startTime = data["startTime"];
    const endTime = Date.now();
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    const endDate = (new Date()).toISOString().split("T")[0];

    console.log(hours);

    await doc.collection("sessions").doc("2").set({
        bucks: Number(BUCKS.value),
        doe: Number(DOE.value),
        buttonBucks: Number(BUTTONBUCKS.value),
        caught: total,
        startTime: startTime,
        endTime: endTime,
        hours: hours,
        endDate: endDate
    });

    await doc.set({
        startTime: 0,
        hours: (Number(data["hours"]) + hours),
        bucks: (Number(data["bucks"]) + Number(BUCKS.value)),
        doe: (Number(data["doe"]) + Number(DOE.value)),
        buttonBucks: (Number(data["buttonBucks"]) + Number(BUTTONBUCKS.value))
    })

    window.location.href = "donecheckout.html";

}

DOE.addEventListener("input", () => {
    updateTotal();
});

BUCKS.addEventListener("input", () => {
    updateTotal();
});

BUTTONBUCKS.addEventListener("input", () => {
    updateTotal();
});


CHECKOUT.addEventListener("click", () => {

    updateData();

});
