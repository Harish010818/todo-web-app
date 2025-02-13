import { Todo } from "../models/todo.js";
import { User } from "../models/user.js";

export const createTodo = async (req, res) => { 
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "All field are required"
            })
        }
        
        const user = await User.findById(req.params._id);
        if(!user) {
            return res.status(400).json({
              message: "User not exist with this id"
            })
        }

       const tododata =  await Todo.create({userId : req.params._id, title, description });
       //tododata.save(); option when you use => new Todo() cunstrucotr 
        
        
        return res.status(201).json({
             message: "todo created successfully", 
             tododata
        })
    }
    catch (err) {
        console.error(err);
    }
};


export const getAlltodo = async (req, res) => {
    try {
        const todos = await Todo.find({});
        return res.status(200).json({ todos })
    } catch (err) {
        console.error(err);
    }
}


// findandupdate wala version
export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params._id;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, { title, description }, { new: true, runValidators: true });


        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found with this ID",
            });
        }

        return res.status(200).json({
            message: "Updated successfully",
            updatedTodo,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};


// delete todo
export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params._id;
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found with this ID",
            });
        }

        return res.status(200).json({
            messasge: "Todo deleted successfully",
            deletedTodo
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            messasge: "Server error..."
        })
    }
}







// //  findbyid wala version

//  export const updateTodo = async (req, res) => {
//      try {
//          const todoId = req.params._id;
//          const { title, description } = req.body;

//          const todo = await Todo.findById(todoId);

//          if (!todo) {
//              return res.status(404).json({
//                  message: "Todo not found with this ID",
//              });
//          }

//          todo.title = title;
//          todo.description = description;

//          const updatedTodo = await todo.save();

//          return res.status(200).json({
//              message: "Updated successfully",
//              data: updatedTodo,
//          });

//      } catch (err) {
//          console.error(err);
//          return res.status(500).json({
//              message: "Server error",
//          });
//      }
//  };