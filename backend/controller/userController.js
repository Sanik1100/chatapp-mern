import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

 export const signUp=async(req,res)=>{

      const {fullname,email,password,confirmPassword}= req.body;
    try {
    if(password !== confirmPassword){
        return res.status(400).json({error: "Passwords do not match"});
    }

    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({error: "User already exists"});
    }

    // hased the password
    const hashPassword=await bcrypt.hash(password,10)
    const newUser=await new User({
        fullname,
        email,
        password:hashPassword,
        
    })
    await newUser.save();
    if(newUser){
        createTokenAndSaveCookie(newUser._id,res);
        return res.status(201).json({message:"user created successfully",
            user:{
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
            },
        });
    }

   return res.status(201).json({message: "User created successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server error"});
    }
}

export const login= async (req,res) => {

     const {email,password}= req.body;
    try {
       
        const user= await User.findOne({email});
        const isMatch=await  bcrypt.compare(password,user.password);
        if(!user || !isMatch){
            return res.status(400).json({error: "Invalid user Credentials"});
        }
        createTokenAndSaveCookie(user._id,res);
        return res.status(200).json({ message: "User logged in successfully", user:{
            _id: user._id,
            fullname: user.fullname,
            email:user.email
        }});


    } catch (error) {
         console.log(error);
       return  res.status(500).json({error: "Internal Server error"});
    }
    
}

export const logout= async (req,res) => {
    try {
        res.clearCookie("jwt");
        res.status(201).json({message: "User logout successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server error"});
    }
    
};

// fetching all users from the database
export const allUsers= async (req,res) => {
    try {
        const loggedInUser= req.user._id;
        const filteredUsers= await User.find(
            {_id: {$ne:loggedInUser},}
        ).select("-password");
        res.status(201).json(
            filteredUsers
        );
    } catch (error) {
        console.log("Error in allUser Controller:",+error);
        
    }
    
}