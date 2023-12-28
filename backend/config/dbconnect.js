import mongoose from "mongoose";

const connect = async () => {
    await mongoose.connect(
        process.env.MONGO
    ).then(()=>{
        console.log("DB Connected!");
    }).catch((err)=>{
        console.log(err);
    })
}

export default connect;