/* eslint-disable no-undef */
// Importing the Employees table
const Employees = require("../models/Employee");

// Creating or Adding Employee APIs

// --> Create Employee API
// @desc Create Employee
// @access Private
// @route POST /employees/add-employee
const createEmployeeHandler = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  try {
    // defining what will be accepted
    let { fullname, email, phonenumber, position, empdate } = req.body;
    // let { profilepic, fullname, email, phonenumber, position, empdate } = req.body;
    if (
      // !profilepic ||
      !fullname ||
      !email ||
      !phonenumber ||
      !position ||
      !empdate
    ) {
      return res
        .status(400)
        .json({ message: "All fields should be filled!!!" });
    }

    console.log(
      "=====",
      fullname,
      email,
      phonenumber,
      position,
      empdate
    );

    // Check for existing employee
    const existingEmployee = await Employees.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this email already exists" });
    }

    // const testDb = await Employees.findAll();
    // console.log("Database test query:", testDb);

    // creating or adding users to the table in the database
    const employees = await Employees.create({
      profilepic: req.file ? req.file.buffer : null, // if req.file then req.file.buffer
      // profilepic,
      fullname,
      email,
      phonenumber,
      position,
      empdate,
    });

    
    // displaying the information
   const response = {
      profilepic: employees.profilepic
    //   ? `data:${mimeType};base64,${Buffer.from(employees.profilepic).toString("base64")}`
    // : null
    ,
      fullname: employees.fullname,
      email: employees.email,
      phonenumber: employees.phonenumber,
      position: employees.position,
      empdate: employees.empdate,
    };
    res.status(201).json(response);
    // console.log("Response profilepic:", response.profilepic);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Fetch all employees
// --> Get/Fetch Employees API
// @access Public
// @route GET /employees
const getEmployeesHandler = async (req, res) => {
  try {
    // getting all employees from the database table
    const employees = await Employees.findAll();
    // displaying the result
    res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


// @desc Fetch a particular employee
//  --> Fetch employee by ID API
// @access Private
// @route GET /employees/:id
const getEmployeeHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res.status(400).json({
        message: 'Employee not found!!'
      })
    }

    res.status(200).json({
      profilepic: employee.profilepic,
      fullname: employee.fullname,
      email: employee.email,
      phonenumber: employee.phonenumber,
      position: employee.position,
      empdate: employee.empdate,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


// @desc Update/Edit an already existing employee info
// --> Edit employee by ID API
// @access Private
// @route PUT /employees/:id
const updateEmployeeHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let { fullname, email, phonenumber, position, empdate } = req.body;
    if (
      // !profilepic ||
      !fullname ||
      !email ||
      !phonenumber ||
      !position ||
      !empdate
    ) {
      return res
        .status(400)
        .json({ message: "All fields should be filled!!!" });
    }

    // checking if the employee details exist
    const employee = await Employees.findByPk(id);
    if (!employee) {
      return res.status(400).json({
        message: 'Employee not found!!'
      })
    }
    // update employee details
    // employee.profilepic = profilepic;
    employee.profilepic = req.file ? req.file.buffer : null, // if req.file then req.file.buffer
    employee.fullname = fullname;
    employee.email = email;
    employee.phonenumber = phonenumber;
    employee.position = position;
    employee.empdate = empdate;
    await employee.save();

    // returning updated details
    res.status(200).json(employee)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


// @desc Delete employee details
// --> Delete Employee by ID API
// @access Private
// @route DELETE /employees/:id
const deleteEmployeeHandler = async (req, res) => {
  try {
  const { id } = req.params;
  // checking if the employee details exist
  const employee = await Employees.findByPk(id);
  if (!employee) {
    return res.status(400).json({
      message: 'Employee not found!!'
    })
  }

  // Delete Employee
  employee.destroy();
  // returning a response
  res.status(200).json({
    message: 'Employee Details successfully deleted'
  });
} catch (error) {
    return res.status(500).json({
      message: error.message
    })
}
}

module.exports = {
  createEmployeeHandler,
  getEmployeesHandler,
  getEmployeeHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler
};
