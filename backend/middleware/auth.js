import jwt from "jsonwebtoken";

export const ensureAuthenticated = async (req,res,next) => {

    const cookie = req.cookies.jwtCookie;

    if(!cookie){
        return res.status(401).json({
            message : "Token is expired! Try again by signing in"
        })
    }

    try {
        const decoded = jwt.verify(cookie,process.env.SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message : "Token is required!"
        })
    }

}

//Note we can use the res.render for windows shifting


//Down method is by using the headers :

 // if(!req.headers["authorization"]){
 //     return res.status(401).json({
 //         message : "Token is required!"
 //     })
 // }

 // try {
 //     const decoded = jwt.verify(req.headers["authorization"],process.env.SECRET);
 //     req.user = decoded;
 //     return next();
 // } catch (err) {
 //     console.log(err);
 //     return res.status(401).json({
 //         message : "Token is required!"
 //     })
 // }

