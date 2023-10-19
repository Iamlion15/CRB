const mongoose=require("mongoose");
const dotenv=require("dotenv").config()
const dbConnect=async()=>{
    try {
        console.log(process.env.DATABASE_URL)
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("database connected")
    } catch (error) {

        console.log("error connecting to the database ",error)
    }
}


module.exports= dbConnect;