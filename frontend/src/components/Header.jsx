import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const onToggleAddEmpBtn = () => {
    navigate("/employees/add-employee");
  };

  return (
    <header id="header" className="sticky top-0 z-10 bg-[#172554] py-4">
      <div className=" relative container flex justify-between items-center mx-auto px-4  text-white">
        <h1 className="font-bold text-xl md:text-3xl">
          EMPLOYEE MANAGEMENT SYSTEM
        </h1>
        <button
          className="flex items-center bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700"
          onClick={onToggleAddEmpBtn}
        >
          <MdAddCircle className="mr-4 text-4xl md:text-2xl" /> Add Employee
        </button>
      </div>
    </header>
  );
};

export default Header;
