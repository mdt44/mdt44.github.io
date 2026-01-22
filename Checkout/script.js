
async function addData(Id){

    const thisDate = (new Date()).toISOString().split("T")[0];
    
    const dataRef = db
        .collection("Data")
        .doc("Checkout");

    await dataRef.set({
        Checkout: firebase.firestore.FieldValue.arrayUnion(document.getElementById("deerCaught"))
    }, { merge: true });

}


document.getElementById("submit").onclick = function goToCheckout(){
    addData(document.getElementById("id"));
    window.location.replace("https://mdt44.github.io/Hunter/hunter.html");
}

document.getElementById("return").onclick = function goToCheckout(){
    window.location.replace("https://mdt44.github.io/Hunter/hunter.html");
}