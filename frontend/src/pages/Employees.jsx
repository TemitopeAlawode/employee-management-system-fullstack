/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../features/employee/employeeSlice";
// import { Buffer } from "buffer";

const Employees = ({ employees, onEditEmployee }) => {
  const dispatch = useDispatch();

  const handleDelete = (id, name) => {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete '${name}' employee details?`
    );
    if (confirmDeletion) {
      dispatch(deleteEmployee(id));
      console.log(id);
    }
  };

        // Normalize empdate to YYYY-MM-DD format
  // const formatDate = (empdate) => {
  //      const date = new Date(empdate);
  //      return date.toISOString().split("T")[0];
  // };

  // Function to convert Buffer to base64
  const getImageSrc = (profilepic) => {
    if (!profilepic){
      return "";
     } // Return empty string if no image
    if (typeof profilepic === "string") { 
      return profilepic;
    } // If already a base64 string
    // Convert Buffer to base64
    // Convert byte array to base64
    // const byteArray = new Uint8Array(profilepic.data); // Converts the Sequelize byte array to a typed array.
    // const binaryString = String.fromCharCode(...byteArray); // Turns the bytes into a binary string.
    // const base64 = btoa(binaryString); // Encodes the string to base64.
    // return `data:image/*;base64,${base64}`; // Prefixes the base64 string for the <img> tag, with a wildcard MIME

    // Convert Sequelize Buffer to base64
  // const base64 = Buffer.from(profilepic.data).toString("base64");
  // return `data:image/*;base64,${base64}`; // Use wildcard MIME type

    const base64String = btoa(
      new Uint8Array(profilepic.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/*;base64,${base64String}`;
    // return `data:image/jpeg;base64,${base64String}`;
  };
  return (
    <div className="container flex flex-wrap justify-center items-center gap-6 mt-4">
      {/* <div className="container flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:pl-4"> */}
      {employees.map((employee) => (
        <div
          className="list-none shadow-md w-64 text-center bg-gray-200"
          key={employee.id}
          // key={employee.id || employee.email}
        >
          <div className="py-2">
            <img
              // src={employee.profilepic}
              src={getImageSrc(employee.profilepic)}
              alt={employee.fullname}
              className="w-16 h-16 mx-auto rounded-full"
            />
          </div>
          <div className="py-2">{employee.fullname}</div>
          <div className="py-2">{employee.email}</div>
          <div className="py-2">{employee.phonenumber}</div>
          <div className="py-2">{employee.position}</div>
          <div className="py-2">{employee.empdate}</div>
          {/* <div className="py-2">{formatDate(employee.empdate)}</div> */}
          <div className="py-2 px-4">
            <button
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
              onClick={() => onEditEmployee(employee.id)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded ml-4 hover:bg-red-700"
              onClick={() => handleDelete(employee.id, employee.fullname)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Employees;