document.getElementById("login-btn").addEventListener("click", function () {
    // 1. get the username
    const nameInput = document.getElementById("input-name");
    const username = nameInput.value;
    console.log(username);

    // 2. get the password
    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    console.log(password);

    // 3. match username & password
    if (username == "admin" && password == "admin123") {
        alert("login Successful");
        window.location.assign("../dashboard.html");
    }
    else {
        alert("login Failed")
        return;
    }
})
