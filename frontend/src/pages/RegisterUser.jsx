import { useState } from "react"
import { useNavigate } from "react-router";

const RegisterUser = () => {
// State for each input field
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

// for redirecting after registration success
const navigate = useNavigate();

// Handles 'Register' form submission
const onSubmit = async(e) => {
e.preventDefault(); // Prevents page refresh

const userData = {username, email, password}
try {
  const response = await fetch(
    // "http://localhost:8000/auth/register",
    `${import.meta.env.REACT_APP_BACKEND_URL}/auth/register`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData)
  }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || `HTTP error: ${response.status}`);
  }
  // else{
    // return result;
    console.log("User successhfully registered", result);
    alert("Registration Successful!!")
    // Clear the form input box
    setUsername("");
    setEmail("");
    setPassword("");
    navigate("/auth/login"); // Redirect to login page
  // }
} catch (error) {
  console.error("Error during registration", error);
  alert(error.message || "An error occurred. Please try again.")
}
}

  return (
    <div>
      <h1 className="text-4xl font-semibold">EMS</h1>

      <div className="flex justify-center items-center max-w-md mx-auto bg-white shadow-lg ">
        <form className="space-y-6" onSubmit={onSubmit}>

          <h1 className="text-center text-2xl font-bold mt-2">REGISTER</h1>

          <div className="my-4">
            <label htmlFor="username">
              USERNAME:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="email">EMAIL:</label>
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
            <label htmlFor="password">PASSWORD:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center ">
            <button
            type="submit"
             className="bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-[#172554] mb-4">
              Register
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterUser