import { useState, useEffect } from "react";
import Header from "../src/components/Header";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Employees from "./components/Employees";

const App = () => {
  // For the Add Employee form to pop up when the button is clicked
  const [showaddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  // For the employees
const [employees, setEmployees] = useState([]);

// For the employee to be edited
const [employeeToEdit, setEmployeeToEdit] = useState(null);
const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false);

  const toggleAddEmployeeBtn = () => {
    setShowAddEmployeeForm(!showaddEmployeeForm);
  };

useEffect(() => {
  const getEmployees = async () => {
    const employeesFromServer = await fetchEmployees();
    setEmployees(employeesFromServer); // to add it to our state
  };
  getEmployees();
}, []);

// Fetch employees
const fetchEmployees = async () => {
  const res = await fetch("http://localhost:8000/employees");
  const data = await res.json();
  console.log(data);
  return data;
}
fetchEmployees();

  // Fetch a single Employee from the server for editing
  const fetchEmployee = async (id) => {
    const res = await fetch(`http://localhost:8000/employees/${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  };

// Add Employee
const addEmployee = async (employee) => {
  // To add task to the server and UI
  const res = await fetch("http://localhost:8000/employees", {
    method: "POST",
    headers: {
      // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
      "Content-type": "application/json",
    },
    // body: Contains the actual data (converted into JSON) that is being sent to the server.
    body: JSON.stringify(employee),
  });
  const data = await res.json();
  setEmployees([...employees, data]);
};

// Delete Employee 
const deleteEmployee = async(id) => {
  await fetch(`http://localhost:8000/employees/${id}`, {
  method: "DELETE"
  });
  setEmployees(employees.filter((employee)=> employee.id != id));
}


// Edit Employee
const editEmployee = async (id, updatedData) => {
  const empToEdit = await fetchEmployee(id);
  const editedEmployee = { ...empToEdit, ...updatedData };
  const res = await fetch(`http://localhost:8000/employees/${id}`, {
    method: "PUT",
    headers: {
      // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
      "Content-type": "application/json",
    },
    // body: Contains the actual data (converted into JSON) that is being sent to the server.
    body: JSON.stringify(editedEmployee),
  });
  const data = await res.json();

  // the data we're getting back is the updated employee details...
  setEmployees(
    employees.map(
      (employee) => (employee.id === id ? { ...employee, ...data } : employee)
   )
  );
}

const handleEditEmployee = async (id) => {
  const empToEdit = await fetchEmployee(id);
  setEmployeeToEdit(empToEdit);
  setShowEditEmployeeForm(true);
};

  return (
    <div>
      <Header onToggleAddEmpBtn={toggleAddEmployeeBtn} />
      <Employees employees={employees} onDeleteEmployee={deleteEmployee} onEditEmployee={handleEditEmployee}/>
      {showaddEmployeeForm && <AddEmployee onCancel = {toggleAddEmployeeBtn} onAddEmployee={addEmployee} />}
      {showEditEmployeeForm && (
        <EditEmployee
          employee={employeeToEdit}
          onCancel={() => setShowEditEmployeeForm(false)}
          onSave={(updatedData) => {
            editEmployee(employeeToEdit.id, updatedData);
            setShowEditEmployeeForm(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
