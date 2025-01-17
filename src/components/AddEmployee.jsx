import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../features/employee/employeeSlice";

const AddEmployee = ({ onCancel }) => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [empDate, setEmpDate] = useState("");

const dispatch = useDispatch();

  // For when the 'Add Employee' form is submitted
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee({
      profilePic,
      fullName,
      email,
      phoneNumber,
      jobPosition,
      empDate,
    }));

    // Clears out the input box
    setProfilePic("");
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setJobPosition("");
    setEmpDate("");

    alert("Employee Successfully Added");
    onCancel();
  };

  // For handling profile picture display
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]; // Get the file selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Store the base64 data URL
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto rounded-md p-6 bg-white shadow-md">
        <form action="" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">Add Employee</h1>

          <div className="my-4">
            <label htmlFor="profilePic">PROFILE PICTURE</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={handleProfilePicChange}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="fullName">
              FULL NAME(Kindly enter the first name first)
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
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
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="phone">PHONE NUMBER</label>
            <input
              type="text"
              id="phone"
              name="phone"
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
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setJobPosition(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="empDate">EMPLOYMENT DATE</label>
            <input
              type="date"
              id="empDate"
              name="empDate"
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
