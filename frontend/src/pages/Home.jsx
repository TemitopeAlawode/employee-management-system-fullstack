import { Link } from "react-router";
const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-home-bg bg-cover">
      <div className="text-center space-y-6 bg-sky-400 bg-opacity-60 p-8 rounded-md shadow-lg max-w-lg">
        <h2 className="text-4xl font-bold">
          Welcome to XYZ Company Employee Management System...
        </h2>

        <div className="flex justify-between">
          <Link
            to="/auth/register"
            className="inline-block bg-blue-700 px-6 py-3 rounded font-semibold hover:bg-[#172554] py hover:text-white shadow-md transition duration-300"
          >
            {" "}
            Register{" "}
          </Link>
          <Link
            to="/auth/login"
            className="inline-block bg-blue-700 px-6 py-3 rounded font-semibold hover:bg-[#172554] py hover:text-white shadow-md transition duration-300"
          >
            {" "}
            Login{" "}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
