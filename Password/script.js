
if(checkPassword(sessionStorage.getItem("passwordSaved")) === true){
    window.location.replace("mdt44.github.io/Research/research.html");
}

const form = document.getElementById("auth-form");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const password = form.password.value.trim();
  
    message.textContent = "";
  
    if (!username || !password) {
      message.textContent = "All fields are required!";
      return;
    }
    sessionStorage.setItem("passwordSaved", password);

    if(checkPassword(sessionStorage.getItem("passwordSaved")) === true){
        window.location.replace("mdt44.github.io/Research/research.html");
    } else{
        var yeah = sessionStorage.getItem("passwordSaved");
    }

    return;
});
