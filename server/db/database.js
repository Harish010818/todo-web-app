import mongoose from "mongoose";

const connectDB = async () =>{
    try {
       mongoose.connect(process.env.MONGO_URI);
       console.log("mongodb connected succesfully");
    }
    catch(err){
       console.err(err);
    }
}

export default connectDB;