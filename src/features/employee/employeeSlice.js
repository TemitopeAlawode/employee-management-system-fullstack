import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Add Employee
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee) => {
    // To add task to the server and UI
    const res = await fetch(
      "https://employee-management-system-69ph.onrender.com/employees",
      {
        method: "POST",
        headers: {
          // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
          "Content-type": "application/json",
        },
        // body: Contains the actual data (converted into JSON) that is being sent to the server.
        body: JSON.stringify(employee),
      }
    );
    const data = res.json();
    return data;
    // setEmployees([...employees, data]);
  }
);

// Edit Employee
export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ id, updatedData }) => {
    // const empToEdit = await fetchEmployee(id);
    console.log("Value of id:", id);
    console.log("Type of id:", typeof id);
    const empToEditRes = await fetch(
      `https://employee-management-system-69ph.onrender.com/employees/${id}`
    );
    const empToEdit = await empToEditRes.json();
    const editedEmployee = { ...empToEdit, ...updatedData };
    const res = await fetch(
      `https://employee-management-system-69ph.onrender.com/employees/${id}`,
      {
        method: "PUT",
        headers: {
          // headers: Specifies the data format (application/json) so the server knows it’s receiving JSON.
          "Content-type": "application/json",
        },
        // body: Contains the actual data (converted into JSON) that is being sent to the server.
        body: JSON.stringify(editedEmployee),
      }
    );
    const data = await res.json();
    return data;
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id) => {
    await fetch(
      `https://employee-management-system-69ph.onrender.com/employees/${id}`,
      {
        method: "DELETE",
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
