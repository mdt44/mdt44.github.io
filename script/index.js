const ID = document.getElementById("hunterId");
const NAME = document.getElementById("hunterName");
const LOGIN = document.getElementById("login");

LOGIN.addEventListener("click", () => {
    if(ID.value >= 1 && ID.value <= 99){
        checkLoginInfo(ID.value, NAME.value);
    }
});

async function checkLoginInfo(id, name){

    const doc = await db
        .collection("login")
        .doc("hunters")
        .get();

    const correctName = doc.data()[String(id)];

    if(correctName.toLowerCase() === name.toLowerCase()){
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("name", name);
        window.location.href = "choose.html";
    }
}

