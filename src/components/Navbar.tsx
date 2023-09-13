import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className=" bg-slate-400 flex justify-between px-10 sm:px-3 py-3 z-5">
      <h1 className="text-2xl lg:text-3xl">MERN Stack with MySQL</h1>
      <ul className="text-sm md:text-base flex justify-center gap-2 md:gap-6" >
        <li className="flex p-2  bg-blue-300 rounded-md hover:bg-blue-500">
          <Link to="/" >Home</Link>
        </li>
        <li className="flex p-2 bg-blue-300 rounded-md hover:bg-blue-500">
          <Link to="/new" >Create Task</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
