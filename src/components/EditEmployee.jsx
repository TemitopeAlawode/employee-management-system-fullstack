import { useState } from "react";
import { useDispatch } from "react-redux";
import { editEmployee } from "../features/employee/employeeSlice";

const EditEmployee = ({ employee, onCancel, onSave }) => {
  const [profilePic, setProfilePic] = useState(employee.profilePic);
  const [fullName, setFullName] = useState(employee.fullName);
  const [email, setEmail] = useState(employee.email);
  const [phoneNumber, setPhoneNumber] = useState(employee.phoneNumber);
  const [jobPosition, setJobPosition] = useState(employee.jobPosition);
  const [empDate, setEmpDate] = useState(employee.empDate);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editEmployee({
        id: employee.id,
        updatedData: {
          profilePic,
          fullName,
          email,
          phoneNumber,
          jobPosition,
          empDate,
        },
      })
    );
    console.log("id:", employee.id);
    onSave();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto rounded-md p-6 bg-white shadow-md">
        <form action="" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold mb-4 text-center">Edit Employee</h1>

          <div className="my-4">
            <label htmlFor="profilePic">PROFILE PICTURE</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={handleProfilePicChange}
            />
            {/* {profilePic && <img src={profilePic} alt={employee.fullName} className="mt-2 w-6 h-6 rounded-full" />} */}
          </div>

          <div className="my-4">
            <label htmlFor="fullName">FULL NAME</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
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
              value={email}
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
              value={phoneNumber}
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
              value={jobPosition}
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
              value={empDate}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setEmpDate(e.target.value)}
              required
            />
          </div>

          <div className="mt-4 flex space-x-2">
            <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Save
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

export default EditEmployee;
