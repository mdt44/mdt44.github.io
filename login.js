
async function checkPassword(value){

    const password = db
        .collection("reserved")
        .doc("password");

    const snap = await password.get();
    const pass = snap.data().password;

    console.log(pass);
    console.log(value);
    console.log(pass === value);
    return value === pass;

}


