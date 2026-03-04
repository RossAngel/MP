import {useState,useEffect} from "react"
import {useNavigate,useParams} from "react-router-dom"
import {getProducts,updateProduct} from "../../services/api"
import "../../assets/styles/forms.css"

function Edit(){

  const {id} = useParams()
  const nav = useNavigate()

  const [data,setData] = useState({
    Pname:"",
    price:"",
    Disc:"",
    Image:""
  })

  const handle = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  useEffect(()=>{

    getProducts().then(res=>{

      const product = res.data.find(p=>p._id===id)

      if(product){
        setData(product)
      }

    })

  },[])

  const submit = ()=>{

    if(!data.Pname || !data.price){
      return alert("Fill all fields")
    }

    updateProduct(id,data).then(()=>{
      nav("/")
    })

  }

  return(

    <div className="page">

      <div className="form-card">

        <h2>Edit Product</h2>

        <input
          name="Pname"
          value={data.Pname}
          onChange={handle}
          placeholder="Product Name"
        />

        <input
          name="price"
          value={data.price}
          onChange={handle}
          placeholder="Price"
        />

        <input
          name="Disc"
          value={data.Disc}
          onChange={handle}
          placeholder="Description"
        />

        <input
          name="Image"
          value={data.Image}
          onChange={handle}
          placeholder="Image URL"
        />

        <button onClick={submit}>
          Update Product
        </button>

      </div>

    </div>

  )

}

export default Edit