import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employee/employeeSlice";
import { useNavigate } from "react-router";
// import imageCompression from "browser-image-compression";

const AddEmployee = () => {
  const [profilepic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [empdate, setEmpDate] = useState("");

  const dispatch = useDispatch();

  // For when the 'Add Employee' form is submitted
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addEmployee({
        profilepic,
        fullname,
        email,
        phonenumber,
        position,
        empdate,
      })
    );
    // Clears out the input box
    setProfilePic(null);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPosition("");
    setEmpDate("");

    alert("Employee Successfully Added");
    // navigate back to where all the employees are displayed
    navigate("/employees");
    // onCancel();
  };

  // For handling profile picture display
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]; // Get the file selected
    setProfilePic(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setProfilePic(reader.result); // Store the base64 data URL
    //   };
    //   reader.readAsDataURL(file); // Convert file to base64 string
    // }
  };
  
  
  // Cancel button functionality
  const navigate = useNavigate();
  const onCancel = () => {
    //   if (profilepic || fullname || email || phonenumber || position || empdate) {
    //     const confirmCancel = window.confirm("Are you sure you want to discard the changes?");
    // return
    //   }
    // navigate back to where all the employees are displayed after cancelling
    navigate("/employees");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto rounded-md p-6 bg-white shadow-md">
        <form action="" onSubmit={onSubmit} encType="multipart/form-data">
          <h1 className="text-2xl font-bold mb-4 text-center">Add Employee</h1>

          <div className="my-4">
            <label htmlFor="profilepic">PROFILE PICTURE</label>
            <input
              type="file"
              id="profilepic"
              name="profilepic"
              // value={profilepic}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={handleProfilePicChange}
              // required
            />
          </div>

          <div className="my-4">
            <label htmlFor="fullname">
              FULL NAME(Kindly enter the first name first)
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={fullname}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="phonenumber">PHONE NUMBER</label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={phonenumber}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="position">JOB-POSITION</label>
            <input
              type="text"
              id="position"
              name="position"
              value={position}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="empdate">EMPLOYMENT DATE</label>
            <input
              type="date"
              id="empdate"
              name="empdate"
              value={empdate}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setEmpDate(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 flex space-x-2">
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Add
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-600 rounded-md px-4 py-2 hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
