import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//user register handler
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All field are required"
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: " The user is already exist with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({
            username,
            email,
            password: hashedPassword
        });
         
        
        // to generate cookies for user session
        const token = jwt.sign({ userId : userData._id }, process.env.SECRET_KEY, { expiresIn: '1d' }); 
        

        return res.status(201)
        .cookie("token", token, {
            httpOnly: true,    // JavaScript se access na ho (XSS attacks se bachav)
            secure: true,       // Sirf HTTPS pe kaam kare (production ke liye)
            sameSite: "strict",   // CSRF se bachav
            maxAge: 24 * 60 * 60 * 1000   // 1 din ke liye valid
        })
        .json({
            message: "Account has been created succesfully!",
            userData
        })

    } catch (err) {
        console.error(err);
    }
}


// user login handler
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All field are required"
            })
        }
         
        const user = await User.findOne({ email });
        let isPswdMatch = 0;
        // matching password is valid or not
        if (user) isPswdMatch = await bcrypt.compare(password, user.password);

        if (!user || !isPswdMatch) {
            return res.status(400).json({
                message: "Incorrect email or password furrrr"
            })
        }
        
   
        // to generate cookies for user session
        const token = jwt.sign({ userId : user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200)
        .cookie("token", token, {
            httpOnly: true,    // JavaScript se access na ho (XSS attacks se bachav)
            secure: true,       // Sirf HTTPS pe kaam kare (production ke liye)
            sameSite: "strict",  // CSRF se bachav
            maxAge: 24 * 60 * 60 * 1000  // 1 din ke liye valid
        })
        .json({message: "Login successfully",  user})

    }
    catch (err) {
        console.error(err);
    }
}

// user logout handler
export const logout = async (_ , res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "logged out successfully"
            });
    } 
    catch (err) {
        console.error(err);
    }
}


