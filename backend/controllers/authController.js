import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Read value from .env file
dotenv.config();

import UserModal from "../models/authModel.js";

const jwtSecret = process.env.JWT_SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser) return res.status(404).json({ success:0, message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ success:0, message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, jwtSecret, { expiresIn: "1h" });
    
    res.status(201).json({success:1,message:"",data:{email:oldUser.email,name:oldUser.name},token});
  } catch (err) {
    res.status(500).json({ success:0, message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign( { email: result.email, id: result._id }, jwtSecret, { expiresIn: "1h" } );
    
    res.status(201).json({success:1,message:"User registered successfully",data:result,token});
  } catch (error) {
    res.status(500).json({ success:0, message: "Something went wrong" });
  }
};
