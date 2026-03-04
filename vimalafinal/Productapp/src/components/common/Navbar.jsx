import {Link,useNavigate} from "react-router-dom"
import {FaShoppingCart} from "react-icons/fa"
import "../../assets/styles/Navbar.css"

function Navbar(){

  const nav = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  const logout = ()=>{
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("authChanged"))
    nav("/login")
  }

  return(

    <div className="navbar">

      <div className="nav-left">

        <div className="nav-logo">
          <Link to="/" style={{color:"#F3F4F4",textDecoration:"none"}}>
            Chaotic Mart
          </Link>
        </div>

        <div className="nav-links">

          <Link to="/">Products</Link>

          {user?.userType==="admin" && (
            <Link to="/add">Add Product</Link>
          )}

          {user?.userType==="user" && (
            <Link to="/cart">
              <FaShoppingCart style={{marginRight:"6px"}}/>
              Cart
            </Link>
          )}

        </div>

      </div>

      <div className="nav-links">

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}

        {user && (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        )}

      </div>

    </div>

  )

}

export default Navbar