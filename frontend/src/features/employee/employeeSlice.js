import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8000";

// Add Employee
// export const addEmployee = createAsyncThunk(
//   "employee/addEmployee",
//   async (employee) => {
//     const token = localStorage.getItem("token")
//   try {
//     // To add employee to the server and UI
//     const res = await fetch(
//       // "https://employee-management-system-69ph.onrender.com/employees",
//       "http://localhost:8000/employees/add-employee",
//       {
//         method: "POST",
//         headers: {
//           // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}` // Ensure a valid token is sent
//         },
//         // body: Contains the actual data (converted into JSON) that is being sent to the server.
//         body: JSON.stringify(employee),
//       }
//     );
//     // console.log("Employee Data Sent:", JSON.stringify(employee));
//     const data = await res.json();
//     return data;
//     // setEmployees([...employees, data]);
//   }
//   catch(error) {
//     console.error("Error adding employee:", error);
//       // Handle the error appropriately in your UI (e.g., display an error message)
//       return { error: error.message }; // Or return a more structured error object
//   }
//   }
// );

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee) => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("profilepic", employee.profilepic);
      formData.append("fullname", employee.fullname);
      formData.append("email", employee.email);
      formData.append("phonenumber", employee.phonenumber);
      formData.append("position", employee.position);
      formData.append("empdate", employee.empdate);

      // To add employee to the server and UI
      const res = await fetch(
        // "https://employee-management-system-69ph.onrender.com/employees",
        // "http://localhost:8000/employees/add-employee",
        `${API_BASE_URL}/employees/add-employee`,
        {
          method: "POST",
          headers: {
            // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
            Authorization: `Bearer ${token}`, // Ensure a valid token is sent
          },
          // body: Contains the actual data (converted into JSON) that is being sent to the server.
          body: formData,
        }
      );
      // if (!res.ok) {
      //   const errorData = await res.json();
      //   throw new Error(errorData.message || "Failed to add employee");
      // }
      const data = await res.json();
      return data;
      // setEmployees([...employees, data]);
    } catch (error) {
      console.error("Error adding employee:", error);
      // Handle the error appropriately in your UI (e.g., display an error message)
      return { error: error.message }; // Or return a more structured error object
    }
  }
);

// Edit Employee
// export const editEmployee = createAsyncThunk(
//   "employee/editEmployee",
//   async ({ id, updatedData }) => {
//     const token = localStorage.getItem("token")
//     // const empToEdit = await fetchEmployee(id);
//     console.log("Value of id:", id);
//     console.log("Type of id:", typeof id);
//     try {
//     const empToEditRes = await fetch(
//       // `https://employee-management-system-69ph.onrender.com/employees/${id}`
//       `http://localhost:8000/employees/${id}`,
//       {
//         headers: {
//           "Authorization": `Bearer ${token}` // Ensure a valid token is sent
//         }
//       }
//     );
//     const empToEdit = await empToEditRes.json();
//     const editedEmployee = { ...empToEdit, ...updatedData };
//     const res = await fetch(
//       // `https://employee-management-system-69ph.onrender.com/employees/${id}`,
//       `http://localhost:8000/employees/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}` // Ensure a valid token is sent
//         },
//         // body: Contains the actual data (converted into JSON) that is being sent to the server.
//         body: JSON.stringify(editedEmployee),
//       }
//     );

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error updating employee:", error);
//     // Handle the error appropriately in your UI (e.g., display an error message)
//     return { error: error.message }; // Or return a more structured error object
//   }
//   }
// );

export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ id, updatedData }) => {
    const token = localStorage.getItem("token");
    // const empToEdit = await fetchEmployee(id);
    console.log("Value of id:", id);
    console.log("Type of id:", typeof id);
    try {
      const formData = new FormData();
      if (updatedData.profilepic) {
        formData.append("profilepic", updatedData.profilepic);
      } // Only if new file
      formData.append("fullname", updatedData.fullname);
      formData.append("email", updatedData.email);
      formData.append("phonenumber", updatedData.phonenumber);
      formData.append("position", updatedData.position);
      formData.append("empdate", updatedData.empdate);

      const response = await fetch(
        // `https://employee-management-system-69ph.onrender.com/employees/${id}`,
        // `http://localhost:8000/employees/${id}`,
        `${API_BASE_URL}/employees/${id}`,
        {
          method: "PUT",
          headers: {
            // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
            Authorization: `Bearer ${token}`, // Ensure a valid token is sent
          },
          // body: Contains the actual data (converted into JSON) that is being sent to the server.
          body: formData,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update employee");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating employee:", error);
      // Handle the error appropriately in your UI (e.g., display an error message)
      return { error: error.message }; // Or return a more structured error object
    }
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id) => {
    const token = localStorage.getItem("token");
    await fetch(
      // `https://employee-management-system-69ph.onrender.com/employees/${id}`,
      // `http://localhost:8000/employees/${id}`,
      `${API_BASE_URL}/employees/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure a valid token is sent
        },
      }
    );
  }
);

// export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
//     const res = await fetch("https://employee-management-system-69ph.onrender.com/employees");
//     const data = await res.json();
//     console.log(data);
//     return data;
//   }
// );

// export const fetchEmployee = createAsyncThunk('employee/fetchEmployee', async (id) => {
//     const res = await fetch(`https://employee-management-system-69ph.onrender.com/employees/${id}`);
//     const data = await res.json();
//     // console.log(data);
//     return data;
//   }
// );

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
  },
  reducers: {
    // Fetch and Load Employees
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Employee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      //   Delete Employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      // Edit Employee
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
      });
  },
});

// Action creators are generated for each case reducer function
export const { setEmployees } = employeeSlice.actions;

export default employeeSlice.reducer;
