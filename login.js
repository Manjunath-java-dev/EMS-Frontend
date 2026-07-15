const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

// Show/Hide Password
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }

});

// Login
loginBtn.addEventListener("click", async function (event) {

    event.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;

    const response = await fetch("http://localhost:8080/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })

    });

    

const data = await response.json();

if (response.ok) {
     localStorage.setItem("id", data.id);
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
    

  window.location.replace("dashboard.html");

} else {

    alert(data.message);

}

    

});