import { useState } from "react"
import { loginUser } from "../../services/api"
import { useNavigate, Link } from "react-router-dom"
import "../../assets/styles/forms.css"

function Login(){

  const nav = useNavigate()

  const [data,setData] = useState({
    Email:"",
    password:""
  })

  const [error,setError] = useState("")

  const handle = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const login = ()=>{

    if(!data.Email || !data.password){
      return setError("Please fill all fields")
    }

    if(!data.Email.includes("@")){
      return setError("Enter a valid email")
    }

    if(data.password.length < 4){
      return setError("Password must be at least 4 characters")
    }

    setError("")

    loginUser(data).then(res=>{

      if(res.data.message === "Logged in successfully"){

        const userData = {
          id:res.data.userId,
          name:res.data.name,
          email:res.data.email,
          userType:res.data.userType
        }

        localStorage.setItem("user",JSON.stringify(userData))

        // redirect to products page
        nav("/")

      }else{
        setError(res.data.message)
      }

    })

  }

  return(

    <div className="page">

      <div className="form-card">

        <h2>Login</h2>

        {error && <p className="form-error">{error}</p>}

        <input
          name="Email"
          placeholder="Email"
          value={data.Email}
          onChange={handle}
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={data.password}
          onChange={handle}
        />

        <button onClick={login}>
          Login
        </button>

        <p className="form-footer">
          New user? <Link to="/signup">Sign up</Link>
        </p>

      </div>

    </div>

  )

}

export default Login