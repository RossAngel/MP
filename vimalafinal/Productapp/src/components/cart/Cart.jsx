import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import {getCart,removeCart} from "../../services/api"
import "../../assets/styles/products.css"

function Cart(){

  const user = JSON.parse(localStorage.getItem("user"))

  const nav = useNavigate()

  const [items,setItems] = useState([])

  useEffect(()=>{

    if(!user){
      nav("/login")
      return
    }

    loadCart()

  },[])

  const loadCart = ()=>{
    getCart(user.id).then(res=>{
      setItems(res.data)
    })
  }

  const remove = (id)=>{

    removeCart(id).then(()=>{
      loadCart()
    })

  }

  return(

    <div className="page">

      <h2>My Cart</h2>

      {items.length === 0 && (
        <p>Your cart is empty</p>
      )}

      <div className="card-grid">

        {items.map((i)=>(

          <div className="card" key={i._id}>

            <img src={i.productId?.Image}/>

            <div className="card-body">

              <h3>{i.productId?.Pname}</h3>

              <p>{i.productId?.Disc}</p>

              <h4>₹{i.productId?.price}</h4>

              <button
                className="btn"
                onClick={()=>remove(i._id)}
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Cart