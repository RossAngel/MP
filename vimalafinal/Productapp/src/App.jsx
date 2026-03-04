import {Routes,Route} from "react-router-dom"
import {useState,useEffect} from "react"

import Navbar from "./components/common/Navbar"

import View from "./components/products/View"
import Add from "./components/products/Add"
import Edit from "./components/products/Edit"

import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

import Cart from "./components/cart/Cart"

import UserDashboard from "./components/dashboard/UserDashboard"
import AdminDashboard from "./components/dashboard/AdminDashboard"

function App(){

  const [user,setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )

  useEffect(()=>{

    const syncUser = ()=>{
      setUser(JSON.parse(localStorage.getItem("user")))
    }

    window.addEventListener("authChanged",syncUser)

    return ()=>{
      window.removeEventListener("authChanged",syncUser)
    }

  },[])

  let Nav = <Navbar/>

  return(
    <>
      {Nav}

      <Routes>

        <Route path="/" element={<View/>} />

        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/add" element={<Add/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>

        <Route path="/cart" element={<Cart/>}/>

      </Routes>
    </>
  )
}

export default App