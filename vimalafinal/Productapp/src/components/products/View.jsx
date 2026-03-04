import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import {getProducts,deleteProduct,addToCart} from "../../services/api"
import "../../assets/styles/products.css"

function View(){

  const [products,setProducts] = useState([])

  const user = JSON.parse(localStorage.getItem("user"))

  const nav = useNavigate()

  useEffect(()=>{
    loadProducts()
  },[])

  const loadProducts = ()=>{
    getProducts().then(res=>{
      setProducts(res.data)
    })
  }

  const remove = (id)=>{
    deleteProduct(id).then(()=>{
      loadProducts()
    })
  }

  const cart = (pid)=>{

  if(!user){
    return alert("Please login first")
  }

  addToCart({
    userId:user.id,
    productId:pid
  }).then(()=>{
    alert("Added to cart")
  })

}

  return(

    <div className="page">

      <div className="card-grid">

        {products.map((p)=>(

          <div className="card" key={p._id}>

            <img src={p.Image} />

            <div className="card-body">

              <h3>{p.Pname}</h3>

              <p>{p.Disc}</p>

              <h4>₹{p.price}</h4>

              {user?.userType==="admin" && (
                <>
                  <button
                    className="btn"
                    onClick={()=>remove(p._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn"
                    onClick={()=>nav("/edit/"+p._id)}
                  >
                    Edit
                  </button>
                </>
              )}

              {user?.userType==="user" && (
                <button
                  className="btn"
                  onClick={()=>cart(p._id)}
                >
                  Add to Cart
                </button>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default View