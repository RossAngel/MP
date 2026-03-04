import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

function AdminDashboard(){

  const nav = useNavigate()

  useEffect(()=>{
    nav("/")
  },[])

  return null

}

export default AdminDashboard