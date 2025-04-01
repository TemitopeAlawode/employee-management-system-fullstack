import { useState, useEffect } from "react"; // Import React hooks for state and side effects
import Header from "../src/components/Header"; // Import Header component for navigation
import AddEmployee from "./components/AddEmployee"; // Import component for adding new employees
import EditEmployee from "./components/EditEmployee"; // Import component for editing employee details
import Employees from "./pages/Employees"; // Import page to display employee list
import RegisterUser from "./pages/RegisterUser"; // Import page for user registration
import ClipLoader from "react-spinners/ClipLoader"; // Import loading spinner component
import { Routes, Route, useLocation, useNavigate } from "react-router"; // Import routing components from react-router

import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks for state management
import { setEmployees } from "../src/features/employee/employeeSlice"; // Import action to update employees in Redux store
import Home from "./pages/Home"; // Import Home page component
import LoginUser from "./pages/LoginUser";

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8000";

const App = () => {
  // --->>> Local State
  // For the Add Employee form to pop up when the button is clicked / Add Form visibility
  const [showaddEmployeeForm, setShowAddEmployeeForm] = useState(false); // Controls visibility of add employee form

  // For the employee to be edited data to be stored
  // const [employeeToEdit, setEmployeeToEdit] = useState(null); // Stores data of employee being edited

  // Edit Form Visibility
  // const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false); // Controls visibility of edit employee form

  // For Add Employee form visibility
  const toggleAddEmployeeBtn = () => {
    // Toggles the add employee form visibility
    setShowAddEmployeeForm(!showaddEmployeeForm);
  };

  // Before fetching all employees
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state while fetching data

  // --->> Applying Redux for global state management

  // Uses useDispatch for dispatching actions
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  // Uses useSelector to access employees from store
  const employees = useSelector((state) => state.employee.employees); // Retrieves employees from Redux store

  // Get the current location
  const location = useLocation(); // Hook to get current URL location
  const navigate = useNavigate();

  // Initial Data/page load only when the URL is "/employees"
  useEffect(() => {
    // Effect hook for fetching employees on component mount or URL change
    if (location.pathname === "/employees") {
      // Only fetch when on employees route
      const getEmployees = async () => {
        // Async function to fetch employee data
        try {
          const employeesFromServer = await fetchEmployees(); // Fetch employees from API
          dispatch(setEmployees(employeesFromServer)); // Dispatch action to update Redux store
        } catch (error) {
          // Handle any errors during fetch
          console.log("Error fetching employees", error);
        } finally {
          // Execute regardless of success or failure
          setIsLoading(false); // Set loading state to false when done
        }
      };
      getEmployees(); // Call the fetch function
    }
  }, [dispatch, location.pathname]); // Dependencies for useEffect

  // Fetch employees
  // Function to fetch all employees from server
  // "https://employee-management-system-69ph.onrender.com/employees"
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      // const response = await fetch("http://localhost:8000/employees", {
        const response = await fetch(`${API_BASE_URL}/employees`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure the token is sent correctly
        },
      });

      const data = await response.json(); // Parse response to JSON

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch employees");
      }

      console.log("Fetched employees:", data);
      return data; // Return fetched employee data
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  // Fetch a single Employee from the server for editing
  // `https://employee-management-system-69ph.onrender.com/employees/${id}`
  //   const fetchEmployee = async (id) => { // Function to fetch single employee by ID
  //     try {
  //       const token = localStorage.getItem("token");
  //     const res = await fetch( // Make API request for specific employee
  //   `http://localhost:8000/employees/${id}`
  //   , {
  //     method: "GET",
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${token}`  // Ensure the token is sent correctly
  //     }
  // });
  //     const data = await res.json(); // Parse response to JSON
  //     if (!res.ok) {
  //       throw new Error(data.message || "Failed to fetch employees");
  //   }
  //     return data; // Return single employee data
  //   } catch (error) {
  //     console.error("Error fetching employees:", error.message);
  //   }
  //   };

  // Handler for editing an employee
  // const handleEditEmployee = async (id) => {
  //   try {
  //   const empToEdit = await fetchEmployee(id); // Fetch employee data by ID
  //   if (empToEdit) {
  //   setEmployeeToEdit(empToEdit);
  //   navigate(`/employees/${id}`);
  //   }
  // } catch (error) {
  //     console.error("Error fetching employee to edit", error);
  // }
  // };
  const handleEditEmployee = (id) => {
    if (!id) {
      console.error("No ID provided for editing");
    }
    navigate(`/employees/${id}`);
  };

  return (
    <div>
      {" "}
      {/* Main container for the app */}
      {/* Render Header component only if the URL has "/employees" */}
      {location.pathname === "/employees" && (
        <Header onToggleAddEmpBtn={toggleAddEmployeeBtn} />
      )}
      {/* Show the loading spinner only when the URL has "/employees"*/}
      {isLoading && location.pathname === "/employees" ? ( // Conditional rendering for loading state
        <div className="fixed inset-0 flex items-center justify-center">
          {" "}
          {/* Centered loading container */}
          <ClipLoader color={"#09f"} loading={isLoading} size={100} />{" "}
          {/* Loading spinner */}
          <h4 className="text-gray-600 font-semibold text-xl">
            {" "}
            {/* Loading message */}
            Fetching Employees....
          </h4>
        </div>
      ) : (
        // Render routes when not loading

        <Routes>
          {" "}
          {/* Define application routes */}
          <Route path="/" element={<Home />} /> {/* Home page route */}
          <Route path="/auth/register" element={<RegisterUser />} />{" "}
          {/* Registration route */}
          <Route path="/auth/login" element={<LoginUser />} />{" "}
          {/* Signing/Logging in route */}
          <Route
            path="/employees"
            element={
              // Employees list route
              <Employees
                employees={employees}
                onEditEmployee={handleEditEmployee}
                key={employees.id}
              />
            }
          />
          <Route
            path="/employees/add-employee"
            element={ // Add employee route
              <AddEmployee />
            }
          />
          <Route
            path="/employees/:id"
            element={ // Edit employee route with dynamic ID
              <EditEmployee
              // employee={employeeToEdit} // Pass employee data to edit
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App; // Export the App component as default
