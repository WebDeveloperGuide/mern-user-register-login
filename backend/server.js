import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.js";


// Read value from .env file
dotenv.config();

const app = express();

//MongoDB Connection
mongoose.connect(process.env.DB_URL)
.then(()=>{
	console.log("MongoDB Connected!")
}).catch((err)=>{
	console.log(err)
})

//Allow to call from different source
app.use(cors());

// parse requests of content-type - application/json, Read JSON data from request
app.use(express.json());

//Use routes
app.get('/', (req, res) => {
  res.json({message:'Authentication API'})
})

app.use("/api/auth",authRoute);


//Read PORT from .env file OR Default set 1035
const PORT = process.env.PORT || 1035;

app.listen(PORT,()=>{
	console.log(`Server is running on port ${PORT}`)
})