import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {dbName:"PORTFOLIO"})
    .then(()=>{console.log("DB connected succefully")})
    .catch((err)=>{console.log(`DB connection failed error:${err}`);});
}

export default dbConnection;