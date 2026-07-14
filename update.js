const updateBtn = document.getElementById("updateBtn");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const department = document.getElementById("department");
const designation = document.getElementById("designation");
const salary = document.getElementById("salary");
const joiningDate = document.getElementById("joiningDate");
const params = new URLSearchParams(window.location.search);

const employeeId = params.get("id");

console.log(employeeId);


async function loadEmployee() {

    const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {

        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }

    });

    const employee = await response.json();

    console.log(employee);
    name.value = employee.name;
email.value = employee.email;
phone.value = employee.phone;
address.value = employee.address;
department.value = employee.department;
designation.value = employee.designation;
salary.value = employee.salary;
joiningDate.value = employee.joiningDate;

}
loadEmployee();
updateBtn.addEventListener("click", async function(event){

    event.preventDefault();

    const updatedEmployee = {

        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        department: department.value,
        designation: designation.value,
        salary: salary.value,
        joiningDate: joiningDate.value

    };
const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {

    method: "PUT",

    headers: {

        "Content-Type": "application/json",

        Authorization: "Bearer " + localStorage.getItem("token")

    },

    body: JSON.stringify(updatedEmployee)

});

const data = await response.json();

console.log(data);
if(response.ok){

    alert("Employee Updated Successfully");

    window.location.href = "dashboard.html";

}else{

    alert(data.message);

}

});