
var stage = 0;


var decrease = document.getElementById("decrease");
var increase = document.getElementById("increase");
var deerCaught = document.getElementById("deerCaught");

var deerCaughtNum = 0;

decrease.onclick = function(){
    if (deerCaughtNum > 0){
        deerCaughtNum--;
        deerCaught.textContent = deerCaughtNum;
    }
};

increase.onclick = function(){
    if (deerCaughtNum < 10){
        deerCaughtNum++;
        deerCaught.textContent = deerCaughtNum;
    }
};

document.getElementById("deerSubmit").onclick = function(){
    stage = 1;
    
};




async function addData(Id){

    console.log(Id);

    const thisDate = (new Date()).toISOString().split("T")[0];
    
    const dataRef = db
        .collection("Data")
        .doc(thisDate + " - " +Id);

    console.log(document.getElementById("deerCaught").value);

    var deerCaught = parseInt(document.getElementById("deerCaught").value);

    console.log(deerCaught);

    await dataRef.set({
        Checkout: firebase.firestore.FieldValue.arrayUnion(deerCaught, parseInt(Id))
    }, { merge: true });

}


document.getElementById("submit").onclick = function goToCheckout(){
    addData(document.getElementById("id").value);
    window.location.replace("https://mdt44.github.io/Hunter/hunter.html");
}

document.getElementById("return").onclick = function goToCheckout(){
    window.location.replace("https://mdt44.github.io/Hunter/hunter.html");
}