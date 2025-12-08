
async function checkPassword(value){

    const password = db
        .collection("reserved")
        .doc("password");

    const snap = await password.get();
    const pass = snap.data().password;

    return value === pass;

}


