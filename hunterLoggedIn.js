if(!sessionStorage.getItem("hunterId")){
    sessionStorage.setItem("hunterId", 0);
}

var loggedIn = false;
var hID = sessionStorage.getItem("hunterId");

