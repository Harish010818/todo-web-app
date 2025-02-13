import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message : "Authentication error please sign up"
            }) 
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
             return res.status(400).json({
                 message : "Invalid token"
             })
        } 
       
        req.id = decode.userId; // doubt will be discuss further
        next();
         
      } catch(err){
         console.error(err);     
    }        
}