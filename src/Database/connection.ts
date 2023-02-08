import mongoose from "mongoose";


export const connectDB = (url:any)=> {
mongoose.set('strictQuery', false);
mongoose.connect(url).then(()=>{
 console.log("Database connected");
}).catch((err:any)=>console.log(err))

}