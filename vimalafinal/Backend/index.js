const express = require("express")
const cors = require("cors")

require("./connection")

const Product = require("./model/products")
const User = require("./model/user")
const Cart = require("./model/cart")

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// ---------------- AUTH ----------------

// signup
app.post("/api/signup", async (req,res)=>{

  try{

    const user = new User({
      Name:req.body.Name,
      Email:req.body.Email,
      password:req.body.password,
      Phone:req.body.Phone,
      userType:req.body.userType || "user"
    })

    await user.save()

    res.send({message:"Signup successful"})

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Signup failed"})

  }

})


// login
app.post("/api/login", async (req,res)=>{

  console.log("BODY RECEIVED:",req.body)

  try{

    const email = req.body.Email || req.body.email
    const password = req.body.password

    console.log("EMAIL:",email)

    const user = await User.findOne({ Email: email })

    console.log("USER FOUND:",user)

    if(!user){
      return res.send({message:"User not found"})
    }

    if(user.password != password){
      return res.send({message:"Invalid credentials"})
    }

    res.send({
      message:"Logged in successfully",
      userType:user.userType,
      name:user.Name,
      email:user.Email,
      userId:user._id
    })

  }catch(err){
    console.log(err)
    res.status(500).send({message:"Login error"})
  }

})
// ---------------- PRODUCTS ----------------


// add product
app.post("/api/products", async (req,res)=>{
  try{
    await Product.insertMany(req.body)
    res.send({message:"Products added"})
  }catch(err){
    res.status(500).send(err)
  }
})


// get products
app.get("/api/products", async (req,res)=>{

  try{

    const data = await Product.find()

    res.send(data)

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Fetch products failed"})

  }

})


// update product
app.put("/api/products/:id", async (req,res)=>{

  try{

    await Product.findByIdAndUpdate(req.params.id,req.body)

    res.send({message:"Product updated"})

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Update failed"})

  }

})


// delete product
app.delete("/api/products/:id", async (req,res)=>{

  try{

    await Product.findByIdAndDelete(req.params.id)

    res.send({message:"Product deleted"})

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Delete failed"})

  }

})

// remove from cart
app.delete("/api/cart/:id", async (req,res)=>{

  try{

    await cartModel.findByIdAndDelete(req.params.id)

    res.send({message:"Removed from cart"})

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Delete failed"})

  }

})


// ---------------- CART ----------------


// add to cart
app.post("/api/cart", async (req,res)=>{

  try{

    const item = new Cart({
      userId:req.body.userId,
      productId:req.body.productId
    })

    await item.save()

    res.send({message:"Added to cart"})

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Cart error"})

  }

})


// get cart items
app.get("/api/cart/:userId", async (req,res)=>{

  try{

    const items = await Cart
      .find({userId:req.params.userId})
      .populate("productId")

    res.send(items)

  }catch(err){

    console.log(err)
    res.status(500).send({message:"Fetch cart failed"})

  }

})


// ---------------- SERVER ----------------

const PORT = 3004

app.listen(PORT,()=>{

  console.log("Server running on port",PORT)

})