import {User} from "../models/User";
import {IUser} from "../Types/userType";
import {IReq,IRes,INext} from "../common/index";
import {emailValidator} from "../validators/emailValidator";
import { ApiError } from "../Errors/Errors";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/config";

class UserControllers {
    // register method
   public static Register = async (req:IReq,res:IRes,next:INext) => {
   const {fullname,email,password,phoneNumber} = req.body;
    try {
       const user:IUser| null = await User.findOne({email:email});
       if(user) return next(ApiError.NotFound("This user already exist"))
       if(!emailValidator(email)) return next(ApiError.NotFound("please enter a valid email")); 
        const saveuser:IUser|null = await User.create({
         fullname,
         email,
         password,
         phoneNumber
        });
        await saveuser.save(); 
      res.status(200).json("User created");
    } catch (error) {
        next(error)
    }
}
//login method
public static Login = async (req:IReq,res:IRes,next:INext) => {
try {
if(!req.body.email || !req.body.password) return next(ApiError.NotFound("please input values"))
const user = await User.findOne({email:req.body.email});
if(!user) return next(ApiError.NotFound("This user does not exist"));
const isMatch:boolean = await user.matchPassword(req.body.password);
if(!isMatch) return next(ApiError.NotFound("wrong password"));
const token = jwt.sign({id:user._id,email:user.email}, secretKey);
const {password, ...otherDetails} = user._doc;
res.status(200).json({user:{...otherDetails,token}});
} catch (error) {
   next(error) 
 };
}
// get Admin details
public static GetUser = async(req:IReq,res:IRes,next:INext) => {
try {
    const user = await User.findById(req.params.id).populate('houses');
    if(!user) return next(ApiError.NotFound("This user does not exist"));
    res.status(200).json(user);
} catch (error) {
   console.log(error)
}
}
}

export const  {Register,Login,GetUser} = UserControllers;