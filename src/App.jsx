import { useState, useEffect } from "react";
import Header from "../src/components/Header";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Employees from "./components/Employees";
import  ClipLoader  from "react-spinners/ClipLoader";

import { useDispatch, useSelector } from "react-redux";
import { setEmployees } from "../src/features/employee/employeeSlice";

const App = () => {
  // --->>> Local State
  // For the Add Employee form to pop up when the button is clicked / Add Form visibility
  const [showaddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  // For the employee to be edited data to be stored
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  // Edit Form Visibility
  const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false);

  // For Add Employee form visibility
  const toggleAddEmployeeBtn = () => {
    setShowAddEmployeeForm(!showaddEmployeeForm);
  };

// Before fetching all employees
const [isLoading, setIsLoading] = useState(true);

  // --->> Applying Redux for global state management

  // Uses useDispatch for dispatching actions
  const dispatch = useDispatch();
  // Uses useSelector to access employees from store
  const employees = useSelector((state) => state.employee.employees); // Employees data is stored in Redux store

  // Initial Data/page load
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const employeesFromServer = await fetchEmployees();
      dispatch(setEmployees(employeesFromServer)); // to add it to our state
      } 
    catch (error) {
       console.log("Error fetching employees", error); 
    }
    finally{
      setIsLoading(false);
    }
  };
    getEmployees();
  }, [dispatch]);

  // Fetch employees
  // http://localhost:8000/employees
  const fetchEmployees = async () => {
    const res = await fetch(
      "https://employee-management-system-69ph.onrender.com/employees"
    );
    const data = await res.json();
    console.log(data);
    return data;
  };
  // fetchEmployees();

  // Fetch a single Employee from the server for editing
  //  http://localhost:8000/employees/${id}
  const fetchEmployee = async (id) => {
    const res = await fetch(
      `https://employee-management-system-69ph.onrender.com/employees/${id}`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  };

  const handleEditEmployee = async (id) => {
    const empToEdit = await fetchEmployee(id);
    setEmployeeToEdit(empToEdit);
    setShowEditEmployeeForm(true);
  };

  return (
    <div>
      <Header onToggleAddEmpBtn={toggleAddEmployeeBtn} />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color={"#09f"} loading={isLoading} size={100} />
        </div>
      ) : (
        <Employees employees={employees} onEditEmployee={handleEditEmployee} />
      )}
      {showaddEmployeeForm && <AddEmployee onCancel={toggleAddEmployeeBtn} />}
      {showEditEmployeeForm && (
        <EditEmployee
          employee={employeeToEdit}
          onCancel={() => setShowEditEmployeeForm(false)}
          onSave={() => {
            setShowEditEmployeeForm(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
