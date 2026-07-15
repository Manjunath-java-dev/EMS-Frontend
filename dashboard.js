const sectionTitle = document.getElementById("sectionTitle");


const profileCard = document.getElementById("profileCard");

const editProfileBtn = document.getElementById("editProfileBtn");
const employeeTable = document.getElementById("employeeTable");
const actionsHeader = document.getElementById("actionsHeader");
const employeeBody = document.getElementById("employeeBody");
const welcomeMessage = document.getElementById("welcomeMessage");
const roleText = document.getElementById("role");
const logoutBtn = document.getElementById("logoutBtn");


// Check if user is logged in
const token = localStorage.getItem("token");

if (!token) {

    alert("Please login first");

    window.location.href = "login.html";

}


const role = localStorage.getItem("role");
if (role !== "ADMIN") {

    actionsHeader.style.display = "none";

}

// Display user details
welcomeMessage.innerText = "Welcome, " + localStorage.getItem("name");

roleText.innerText = "Role : " + role;

async function loadEmployees() {

    const response = await fetch("http://localhost:8080/employees", {

        headers: {

            Authorization: "Bearer " + localStorage.getItem("token")

        }

    });

    const data = await response.json();

    console.log(data);

    employeeBody.innerHTML = "";

data.content.forEach(employee => {
employeeBody.innerHTML += `

<tr>

    <td>${employee.id}</td>

    <td>${employee.name}</td>

    <td>${employee.email}</td>

    <td>${employee.department ?? "-"}</td>

    <td>${employee.designation ?? "-"}</td>

    <td>

    ${role === "ADMIN"
? `
<button onclick="editEmployee(${employee.id})">Edit</button>

<button onclick="deleteEmployee(${employee.id})">
Delete
</button>
`
: ""
}

</td>

</tr>

`;

});

}

async function loadMyProfile(){

    const id = localStorage.getItem("id");
    // document.getElementById("pageTitle").innerText = "My Profile";

   const response = await fetch(`http://localhost:8080/employees/${id}`, {
    headers:{
        Authorization:"Bearer " + token
    }
});

console.log("GET Status:", response.status);

if (!response.ok) {
    console.log(await response.text());
    return;
}

    const employee = await response.json();
    // console.log(employee);
    employeeTable.style.display = "none";

profileCard.style.display = "block";

// sectionTitle.innerText = "My Profile";

document.getElementById("profileName").innerText = employee.name;

document.getElementById("profileEmail").innerText = employee.email;

document.getElementById("profileDepartment").innerText = employee.department;

document.getElementById("profileDesignation").innerText = employee.designation;

document.getElementById("profilePhone").innerText = employee.phone;

document.getElementById("profileAddress").innerText = employee.address;

document.getElementById("profileJoiningDate").innerText = employee.joiningDate;

}

// console.log("Token:", localStorage.getItem("token"));
// console.log("ID:", localStorage.getItem("id"));
    if(role === "ADMIN"){
      sectionTitle.innerText = "Employees";
    loadEmployees();

}else{

    loadMyProfile();

}

    function editEmployee(id){

    window.location.href = `update.html?id=${id}`;

}


async function deleteEmployee(id) {

    const confirmDelete = confirm("Are you sure you want to delete this employee?");

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(`http://localhost:8080/employees/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: "Bearer " + token

        }

    });

    if (response.ok) {

        alert("Employee deleted successfully");

        loadEmployees();

    } else {

        alert("Failed to delete employee");

    }

}

editProfileBtn.addEventListener("click", () => {

    window.location.href = "edit-profile.html";

});

    


// Logout
logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("token");
localStorage.removeItem("name");
localStorage.removeItem("role");
localStorage.removeItem("email");
localStorage.removeItem("id");

    alert("Logged out successfully");

    window.location.replace("login.html");

});
