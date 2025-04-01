// EditEmployee.jsx
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editEmployee } from "../features/employee/employeeSlice";
import { useNavigate, useParams } from "react-router";

const EditEmployee = () => {
  const [formData, setFormData] = useState({
    profilepic: "",
    fullname: "",
    email: "",
    phonenumber: "",
    position: "",
    empdate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch employee data on mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8000/employees/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch employee");
        const data = await res.json();
        setFormData({
          profilepic: data.profilepic || "",
          fullname: data.fullname || "",
          email: data.email || "",
          phonenumber: data.phonenumber || "",
          position: data.position || "",
          empdate: data.empdate || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editEmployee({ id, updatedData: formData })).unwrap();
      alert("Employee details Successfully Updated");
      navigate("/employees");
    } catch (err) {
      setError(err || "Failed to update employee");
    }
  };

  const onCancel = () => navigate("/employees");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData((prev) => ({ ...prev, profilepic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-md mx-auto rounded-md p-6 bg-white shadow-md">
        <form onSubmit={onSubmit}>
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

          {[
            { id: "fullname", label: "FULL NAME", type: "text" },
            { id: "email", label: "EMAIL", type: "email" },
            { id: "phonenumber", label: "PHONE NUMBER", type: "text" },
            { id: "position", label: "JOB-POSITION", type: "text" },
            { id: "empdate", label: "EMPLOYMENT DATE", type: "date" },
          ].map((field) => (
            <div className="my-4" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={formData[field.id]}
                className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          {error && <p className="text-red-500">{error}</p>}

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

 // let normalizedDate = "";
        // if (data.empdate) {
        //   const date = new Date(data.empdate);
        //   if (!isNaN(date.getTime())) { // Check if it's a valid date
        //     normalizedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        //   }
        // }