import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editEmployee } from "../features/employee/employeeSlice";
import { useNavigate, useParams } from "react-router";

const API_BASE_URL = import.meta.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const EditEmployee = () => {
  const [profilepic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [empdate, setEmpDate] = useState("");

  // console.log("Name", employee.fullname);
  // console.log("Id", employee.id);
  // Get ID from the URL
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch already existing employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      // Function to fetch single employee by ID
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          // Make API request for specific employee
          // `http://localhost:8000/employees/${id}`,
      `${API_BASE_URL}/employees/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Ensure the token is sent correctly
            },
          }
        );
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch employees");
        }
        const data = await response.json(); // Parse response to JSON
        console.log("Fetched employee data: ", data);
        console.log("Fetched employee data date: ", data.empdate);

        // Normalize empdate to YYYY-MM-DD format
        let normalizedDate = "";
        if (data.empdate) {
          const date = new Date(data.empdate);
          normalizedDate = date.toISOString().split("T")[0];
        }

        // return data; // Return single employee data
        setProfilePic(data.profilepic || null);
        setFullName(data.fullname || "");
        setEmail(data.email || "");
        setPhoneNumber(data.phonenumber || "");
        setPosition(data.position || "");
        // setEmpDate(data.empdate || "");
        setEmpDate(normalizedDate);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };
    fetchEmployee();
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(
        editEmployee({
          id,
          updatedData: {
            profilepic,
            fullname,
            email,
            phonenumber,
            position,
            empdate,
          },
        })
      );
      // .unwrap();
      console.log("id:", id);
      alert("Employee details Successfully Updated!!");
      // navigate back to where all the employees are displayed
      navigate("/employees");
    } catch (error) {
      console.error("Failed to update", error);
    }
  };

  // Cancel button functionality
  const onCancel = () => {
    // navigate back to where all the employees are displayed after cancelling
    navigate("/employees");
  };

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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto rounded-md p-6 bg-white shadow-md">
        <form action="" onSubmit={onSubmit} encType="multipart/form-data">
          <h1 className="text-2xl font-bold mb-4 text-center">Edit Employee</h1>

          <div className="my-4">
            <label htmlFor="profilepic">PROFILE PICTURE</label>
            <input
              type="file"
              id="profilepic"
              name="profilepic"
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={handleProfilePicChange}
            />
          </div>

          <div className="my-4">
            <label htmlFor="fullname">FULL NAME</label>
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
              Save
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

export default EditEmployee;
