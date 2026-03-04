const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://Productfinal:mXEVjB4NI2kWMYtv@demo.alzjfva.mongodb.net/?appName=Demo";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();