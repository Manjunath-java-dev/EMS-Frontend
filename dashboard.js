
const employeeTable = document.getElementById("employeeTable");
const profileContainer = document.getElementById("profileContainer");
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
        ? `<button onclick="editEmployee(${employee.id})">Edit</button>`
        : ""
    }

</td>

</tr>

`;

});

}

async function loadMyProfile(){

    const id = localStorage.getItem("id");
    document.getElementById("pageTitle").innerText = "My Profile";

    const response = await fetch(`http://localhost:8080/employees/${id}`,{

        headers:{
            Authorization:"Bearer " + token
        }

    });

    const employee = await response.json();
    employeeTable.style.display = "none";
profileContainer.innerHTML = `

<p><strong>Name:</strong> ${employee.name}</p>

<p><strong>Email:</strong> ${employee.email}</p>

<p><strong>Department:</strong> ${employee.department ?? "-"}</p>

<p><strong>Designation:</strong> ${employee.designation ?? "-"}</p>

<p><strong>Phone:</strong> ${employee.phone ?? "-"}</p>

<p><strong>Address:</strong> ${employee.address ?? "-"}</p>

`;

}
    if(role === "ADMIN"){

    loadEmployees();

}else{

    loadMyProfile();

}

    function editEmployee(id){

    window.location.href = `update.html?id=${id}`;

}

    


// Logout
logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("token");
localStorage.removeItem("name");
localStorage.removeItem("role");
localStorage.removeItem("email");
localStorage.removeItem("id");

    alert("Logged out successfully");

    window.location.href = "login.html";

});
