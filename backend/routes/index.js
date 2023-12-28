import express from "express";
import { getUsers, loginUser, registerUser } from "../controllers";
import { userLoginValidate, userRegisterValidate } from "../middleware/userValidation";
import { ensureAuthenticated } from "../middleware/auth";
const router = express.Router();

router.get("/",(req,res,next) => {
    
})

router.post("/register",userRegisterValidate,registerUser)

router.post("/login",userLoginValidate,loginUser)

router.get("/users",ensureAuthenticated,getUsers);

export default router;