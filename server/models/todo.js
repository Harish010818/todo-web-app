import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
     userId : { type : String, required : true},
     title : { type : String, required : true},
     description : {type : String, required : true}      
})

export const Todo = mongoose.model("Todo", todoSchema);