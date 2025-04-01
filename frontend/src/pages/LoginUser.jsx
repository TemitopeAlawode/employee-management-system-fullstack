import { useState } from "react"
import { useNavigate } from "react-router";

const LoginUser = () => {
// State for each input field
const [usernameOrEmail, setUsernameOrEmail ] = useState("");
const [password, setPassword ] = useState("");

const navigate = useNavigate();

// Handles 'Login' form submission
const onSubmit = async (e) => {
  e.preventDefault();

  // Confirming if what was inputted is an email or username
  // const userLoginData = usernameOrEmail.includes("@")
  // ?
  // { email: usernameOrEmail, password }
  // :
  // { username: usernameOrEmail, password }

  const userLoginData = { usernameOrEmail, password };

  try {
    const response = await fetch("http://localhost:8000/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLoginData)
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || `HTTP error: ${response.status}`);
  }

  alert("Login successful!!")
  // Save token generated after login
  localStorage.setItem("token", result.token); 
  console.log("Token: ", result.token);
  
  // Navigate to employee page
  navigate("/employees")
  } catch (error) {
    console.error("Error logging in...", error);
    alert(error.message || "An error occurred. Please try again.")
  }
}

  return (
    <div>
      <h1 className="text-4xl font-semibold">EMS</h1>

      <div className="flex justify-center items-center max-w-md mx-auto bg-white shadow-lg ">
        <form className="space-y-6" onSubmit={onSubmit}>

          <h1 className="text-center text-2xl font-bold mt-2">LOGIN</h1>

          <div className="my-4">
            <label htmlFor="usernameOrEmail">
              USERNAME/EMAIL:
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={usernameOrEmail}
              placeholder="Input your username or email"
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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
              placeholder="Input your password"
              className="bg-gray-200 border-2 border-gray-400 rounded-md w-full p-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center ">
            <button 
            type="submit"
            className="bg-blue-700 text-white rounded-md px-4 py-2 hover:bg-[#172554] mb-4">
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginUser