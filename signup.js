const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const signupBtn = document.getElementById("signupBtn");

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

// Signup
signupBtn.addEventListener("click", async function (event) {

    event.preventDefault();

   const employee = {

        name: name.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        address: address.value

    };

    const response = await fetch("http://localhost:8080/signup", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

       body:JSON.stringify(employee)

    });

    
const data = await response.json();

console.log(data);

if (response.ok) {

    alert(data.message);

    window.location.href = "login.html";

} else {

    alert(data.message);

}

});