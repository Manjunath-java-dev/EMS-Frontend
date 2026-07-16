let currentPage = 0;
const pageSize = 5;
let totalPages = 0;

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const sectionTitle = document.getElementById("sectionTitle");
const profileCard = document.getElementById("profileCard");
const editProfileBtn = document.getElementById("editProfileBtn");
const employeeTable = document.getElementById("employeeTable");
const actionsHeader = document.getElementById("actionsHeader");
const employeeBody = document.getElementById("employeeBody");
const welcomeMessage = document.getElementById("welcomeMessage");
const roleText = document.getElementById("role");
const logoutBtn = document.getElementById("logoutBtn");
const searchContainer = document.getElementById("searchContainer");
const paginationControls = document.getElementById("paginationControls");


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

   const response = await fetch(
    `http://localhost:8080/employees?page=${currentPage}&size=${pageSize}`,
    {
        headers: {
            Authorization: "Bearer " + token
        }
    }
);

    const data = await response.json();
    totalPages = data.totalPages;

pageInfo.innerText =
    `Page ${currentPage + 1} of ${totalPages}`;

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

async function searchEmployees() {

    currentPage = 0;

    const name = searchInput.value;

    const response = await fetch(
        `http://localhost:8080/employees/searchByName?name=${name}`,
        {
            headers: {
                Authorization: "Bearer " + token
            }
        }
    );

    const employees = await response.json();
    document.getElementById("paginationControls").style.display = "none";

    console.log(employees);

    employeeBody.innerHTML = "";

    employees.forEach(employee => {

        employeeBody.innerHTML += `

<tr>

<td>${employee.id}</td>

<td>${employee.name}</td>

<td>${employee.email}</td>

<td>${employee.department ?? "-"}</td>

<td>${employee.designation ?? "-"}</td>

<td>

<button onclick="editEmployee(${employee.id})">Edit</button>

<button onclick="deleteEmployee(${employee.id})">Delete</button>

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
   if (role === "ADMIN") {

    sectionTitle.innerText = "Employees";

    document.getElementById("paginationControls").style.display = "block";

    loadEmployees();

} else {

    loadMyProfile();

}

    function editEmployee(id){

    window.location.href = `update.html?id=${id}`;

}

prevBtn.addEventListener("click", () => {

    if (currentPage > 0) {

        currentPage--;

        loadEmployees();

    }

});
nextBtn.addEventListener("click", () => {

    if (currentPage < totalPages - 1) {

        currentPage++;

        loadEmployees();

    }

});

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

        if (currentPage > 0 && employeeBody.rows.length === 1) {
    currentPage--;
}

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

searchBtn.addEventListener("click", searchEmployees);
resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    currentPage = 0;

    document.getElementById("paginationControls").style.display = "block";

    loadEmployees();

});

if (role === "ADMIN") {

    searchContainer.style.display = "block";
    employeeTable.style.display = "table";
    paginationControls.style.display = "block";

} else {

    searchContainer.style.display = "none";
    employeeTable.style.display = "none";
    paginationControls.style.display = "none";
    profileCard.style.display = "block";

}
