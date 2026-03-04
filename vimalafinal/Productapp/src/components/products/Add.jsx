import {useState} from "react"
import {addProduct} from "../../services/api"
import {useNavigate} from "react-router-dom"
import "../../assets/styles/products.css"

function Add(){

  const nav = useNavigate()

  const [data,setData] = useState({
    Pname:"",
    price:"",
    Disc:"",
    Image:""
  })

  const [error,setError] = useState("")

  const handle = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const submit = ()=>{

    // validations

    if(!data.Pname || !data.price || !data.Disc || !data.Image){
      return setError("Please fill all fields")
    }

    if(data.Pname.length < 3){
      return setError("Product name too short")
    }

    if(isNaN(data.price)){
      return setError("Price must be a number")
    }

    setError("")

    addProduct(data).then(()=>{

      nav("/")

    })

  }

  return(

    <div className="page">

      <div className="form-card">

        <h2>Add Product</h2>

        {error && <p className="form-error">{error}</p>}

        <input
          name="Pname"
          placeholder="Product Name"
          value={data.Pname}
          onChange={handle}
        />

        <input
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handle}
        />

        <input
          name="Disc"
          placeholder="Description"
          value={data.Disc}
          onChange={handle}
        />

        <input
          name="Image"
          placeholder="Image URL"
          value={data.Image}
          onChange={handle}
        />

        <button onClick={submit}>
          Add Product
        </button>

      </div>

    </div>

  )
}

export default Add