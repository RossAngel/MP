import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3004/api"
})

/* ---------- AUTH ---------- */

export const signupUser = (data)=>{
  return api.post("/signup",data)
}

export const loginUser = (data)=>{
  return api.post("/login",data)
}


/* ---------- PRODUCTS ---------- */

export const getProducts = ()=>{
  return api.get("/products")
}

export const addProduct = (data)=>{
  return api.post("/products",data)
}

export const updateProduct = (id,data)=>{
  return api.put(`/products/${id}`,data)
}

export const deleteProduct = (id)=>{
  return api.delete(`/products/${id}`)
}


/* ---------- CART ---------- */

export const addToCart = (data)=>{
  return api.post("/cart",data)
}

export const getCart = (userId)=>{
  return api.get(`/cart/${userId}`)
}

export const removeCart = (id)=>{
  return api.delete(`/cart/${id}`)
}

export default api