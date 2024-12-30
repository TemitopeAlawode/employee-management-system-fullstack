
const Employees = ({employees, onDeleteEmployee, onEditEmployee}) => {
  return (
    <div className="container flex flex-wrap justify-center items-center gap-6 mt-4">
    {/* <div className="container flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:pl-4"> */}
      {employees.map((employee) => (
        <div className="list-none shadow-md w-64 text-center bg-gray-300" key={employee.id}>
                <div className="py-2">
                    <img src={employee.profilePic} alt={employee.fullName} className='w-16 h-16 mx-auto rounded-full'/>
                </div>
                <li className="py-2">{employee.fullName}</li>
                <li className="py-2">{employee.email}</li>
                <li className="py-2">{employee.phoneNumber}</li>
                <li className="py-2">{employee.jobPosition}</li>
                <li className="py-2">{employee.empDate}</li>
                <li className="py-2 px-4">
                    <button className='bg-green-500 px-4 py-2 rounded hover:bg-green-700' onClick={() => onEditEmployee(employee.id)}>Edit</button>
                    <button className='bg-red-500 px-4 py-2 rounded ml-4 hover:bg-red-700' onClick={() => onDeleteEmployee(employee.id)}>Delete</button>
                </li>
 
        </div>
))}
        </div>

  )
}

export default Employees






















// import EmployeesData from '../data/EmployeesData'

// const Employees = ({employees}) => {
//   return (
//     <div className="container flex flex-wrap justify-center gap-4 mt-4">
//     {/* <div className="container flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:pl-4"> */}
//       {EmployeesData.map((employee) => (
//         <div className="list-none shadow-md w-64 text-center bg-gray-300" key={employee.id}>
//                 <div className="py-2">
//                     <img src={employee.profilePicture} alt={employee.fullName} className='w-16 h-16 mx-auto rounded-full'/>
//                 </div>
//                 <li className="py-2">{employee.fullName}</li>
//                 <li className="py-2">{employee.email}</li>
//                 <li className="py-2">{employee.phoneNum}</li>
//                 <li className="py-2">{employee.position}</li>
//                 <li className="py-2">{employee.employmentDate}</li>
//                 <li className="py-2 px-4">
//                     <button className='bg-green-500 px-4 py-2 rounded hover:bg-green-700'>Edit</button>
//                     <button className='bg-red-500 px-4 py-2 rounded ml-4 hover:bg-red-700'>Delete</button>
//                 </li>
 
//         </div>
// ))}
//         </div>

//   )
// }

// export default Employees

