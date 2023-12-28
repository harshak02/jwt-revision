import jwt from "jsonwebtoken";

export const ensureAuthenticated = async (req,res,next) => {
    if(!req.headers["authorization"]){
        return res.status(401).json({
            message : "Token is required!"
        })
    }

    try {
        const decoded = jwt.verify(req.headers["authorization"],process.env.SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message : "Token is required!"
        })
    }
}

