import dotenv from "dotenv"
dotenv.config();
import { NextFunction, Request, Response } from "express";
import db from "../models/index";
import generateToken from "../middleware/generateToken";
import { Op } from "sequelize";
import { UserPayload } from "../types/express";
const {User} = db;
const {
  hashEmail,
  hashPassword,
} = require('./script');

//handler register
const registerUser = async(req: Request,res: Response, next: NextFunction)=>{
  try {
    const {
      fullName, email, password
    } = req.body;
    
    // Check Field
    if(!fullName || !email || ! password){
      const error = new Error("Please fill all the form") as any;
      error.statusCode = 400;
      throw error;
    }
    
    // Akun udah ada / belum
    const userExist = await User.findOne({
      where:{
        email: email
      }
    });
    
    if(userExist){
      const error = new Error("User Already exists") as any;
      error.statusCode = 405;
      throw error;
    }
    
    // username udah kepakai
    const fullNameExist = await User.findOne({
      where:{
        fullName: fullName
      }
    });

    if(fullNameExist){
        const error = new Error("User Already exists") as any;
        error.statusCode = 406;
        throw error;
    }
    
    //hashed data user    
    const hashedEmail = hashEmail(email);
    const hashedPassword = hashPassword(password);
    
    //insert data ke tabel User
    const currentUser = await User.create({
      fullName,
      email: hashedEmail.toString('hex'),
      password : hashedPassword.toString('hex'),
      profilePicture: "",
      verified: false
    });
    
    const payload = { userId: currentUser.id, fullName: currentUser.fullName }
    
    //send response
    res.status(201).json({
      status: "success",
      message: "Register Successfull!",
      token: generateToken(payload),
      currentUser
    });
    
  } catch (error: any) {
    next(error);
  }
};

const loginHandler = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const { email, password} = req.body;
    
    const hashedEmail = hashEmail(email).toString('hex');
    const hashedPassword = hashPassword(password).toString('hex');
    
    const currentUser = await User.findOne({
      where:{
        email: hashedEmail
      }
    });
    
    //apabila user tidak ditemukan
    if (currentUser == undefined){
      const error = new Error("wrong email") as any;
      error.statusCode = 400;
      throw error;
    }

    const checkPassword = hashedPassword === currentUser.password ? true : false;
    // const checkPassword = await bcrypt.compare(password, currentUser.password); 

    //apabila password salah / tidak matched
    if (checkPassword === false){
      const error = new Error("wrong email or password") as any;
      error.statusCode = 400;
      throw error;
    }
    const payload:UserPayload = {userId: currentUser.id, fullName: currentUser.fullName}

    res.status(200).json({
      status: "Success",
      message: "Login Successfull!",
      token: generateToken(payload),
      currentUser
    })

  } catch (error: any) {
    next(error);
  }
}

const getUserByToken = async(req: Request,res: Response,next: NextFunction)=>{
  try {
    const keyword = req.query.search;
    const searchCriteria = keyword ? {
      [Op.or]: [
        { fullName: { [Op.like]: `%${keyword}%` } },
        { email: { [Op.like]: `%${keyword}%` } },
      ],
    } : {};
    // Menjalankan query pencarian
    const user = await User.findAll({
      where: {
        id: { [Op.ne]: req.user?.userId }, // kucalikan orang yg login
        ...searchCriteria,
      },
    });

  res.json(user);
  } catch (error: any) {
    next(error);
  }
}

export {
  registerUser, loginHandler, getUserByToken
}