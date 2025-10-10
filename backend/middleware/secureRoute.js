import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secureRoute=async (req,res,next) => {
    try {
       let token=req.cookies.jwt;
       
  // If no cookie, check Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); // Remove 'Bearer ' prefix
            }
        }
          console.log("Token found:", token ? "Yes" : "No");
        console.log("Cookies:", req.cookies);
        console.log("Auth Header:", req.headers.authorization);

        if(!token){
            return res.status(401).json({error: "No token, authorization denied",
                debug: {
                    cookiesReceived: Object.keys(req.cookies).length > 0,
                    authHeaderReceived: !!req.headers.authorization
                }
            });
        }
        const decoded= jwt.verify(token, process.env.JWT_TOKEN);
        if(! decoded){
            return res.status(401).json({ error: "Invalid Token"});
        }
        // database user
        const user= await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({ error: "No user found"});
        }
        req.user= user;
        next();
    } catch (error) {
        console.log("Error in secureRoute:",error);
                    return res.status(500).json({ error: "Internal server error"});
    }
    
}
export default secureRoute;