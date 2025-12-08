
checkPasswordPass(sessionStorage.getItem("passwordSaved"));

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
    console.log(password);
    console.log(" " + sessionStorage.getItem("passwordSaved"));
    
    checkPasswordPass(sessionStorage.getItem("passwordSaved"));

    return;
});
