import {Schema,model,Model} from "mongoose";
import bcrypt from "bcryptjs";
import {IUser} from "../Types/userType";

const UserSchema:Schema<IUser> = new Schema({
    fullname:{
    type:String,
    required:true
    },
    email:{
    type:String,
    required:true
    },
    password:{
    type:String,
    required:true
    },
    phoneNumber:{
    type:String,
    required:true
    },
    isAdmin:{
    type:Boolean,
    default:false
    }
});

UserSchema.pre<IUser>("save", async function (next: any) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password:string) {
    return await bcrypt.compare(password,this.password);
};

export const User:Model<IUser> = model('User',UserSchema); 
