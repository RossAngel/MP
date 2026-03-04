import { useState } from "react"
import { signupUser } from "../../services/api"
import { useNavigate, Link } from "react-router-dom"
import "../../assets/styles/forms.css"

function Signup(){

  const nav = useNavigate()

  const [data,setData] = useState({
    Name:"",
    Email:"",
    password:"",
    Phone:""
  })

  const [error,setError] = useState("")

  const handle = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const signup = ()=>{

    if(!data.Name || !data.Email || !data.password || !data.Phone){
      return setError("Please fill all fields")
    }

    if(data.Name.length < 3){
      return setError("Name must be at least 3 characters")
    }

    if(!data.Email.includes("@")){
      return setError("Enter a valid email")
    }

    if(data.password.length < 4){
      return setError("Password must be at least 4 characters")
    }

    if(data.Phone.length < 10){
      return setError("Enter a valid phone number")
    }

    setError("")

    signupUser(data).then(res=>{

      if(res.data.message === "Signup successful"){
        nav("/login")
      }else{
        setError(res.data.message)
      }

    })

  }

  return(

    <div className="page">

      <div className="form-card">

        <h2>Create Account</h2>

        {error && <p className="form-error">{error}</p>}

        <input
          name="Name"
          placeholder="Name"
          value={data.Name}
          onChange={handle}
        />

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

        <input
          name="Phone"
          placeholder="Phone"
          value={data.Phone}
          onChange={handle}
        />

        <button onClick={signup}>
          Signup
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  )

}

export default Signup