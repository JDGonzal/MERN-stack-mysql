import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div >
      <h1>MERN Stack with MySQL</h1>
      <ul className="flex-container" style={{ display: "flex", padding:"10px",marginRight:"5px"}}>
        <li>
          <Link to="/" style={{marginRight:"25px", float: "right"}}>Home</Link>
        </li>
        <li>
          <Link to="/new" style={{marginRight:"25px", float: "right"}}>Create Task</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
