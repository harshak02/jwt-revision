import express from "express";
import router from "./routes/index.js";
import dotenv from "dotenv";
import connect from "./config/dbconnect.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

app.use("/api",router);

// app.use('/api/v1',(req,res,next) => {
//     res.status(200).send("HelloWorld!");
// })

app.listen(PORT,()=> {
    connect();
    console.log(`Server is running on port ${PORT}`)
})

