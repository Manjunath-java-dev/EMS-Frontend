
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const updateBtn = document.getElementById("updateBtn");

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

let employeeData = {};

async function loadProfile() {

    const response = await fetch(`http://localhost:8080/employees/${id}`, {

        headers: {
            Authorization: "Bearer " + token
        }

    });

    const employee = await response.json();
        employeeData = employee;

    console.log(employee);

    nameInput.value = employee.name;
    emailInput.value = employee.email;
    phoneInput.value = employee.phone;
    addressInput.value = employee.address;

}

loadProfile();
updateBtn.addEventListener("click", updateProfile);

async function updateProfile(event) {

    event.preventDefault();

    const updatedEmployee = {

        name: nameInput.value,
        email: emailInput.value,
        password: "",
        role: employeeData.role,
        department: employeeData.department,
        designation: employeeData.designation,
        salary: employeeData.salary,
        phone: phoneInput.value,
        address: addressInput.value,
        joiningDate: employeeData.joiningDate

    };

    const response = await fetch(`http://localhost:8080/employees/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: "Bearer " + token

        },

        body: JSON.stringify(updatedEmployee)

    });

    if (response.ok) {

    alert("Profile updated successfully");

    localStorage.setItem("name", nameInput.value);

    // Email changed
    if (emailInput.value !== employeeData.email) {

        alert("Email changed successfully. Please login again.");

        localStorage.clear();

        window.location.href = "login.html";

    } else {

        window.location.href = "dashboard.html";

    }

} else {

    alert("Failed to update profile");

}

}