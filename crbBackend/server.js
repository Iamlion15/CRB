const express=require("express");
const cors=require("cors")
const dbConnect=require("./src/database/db")
const statusRoutes=require("./src/routes/crbRoute")
const app=express();
//connecting the db
dbConnect();

app.use(cors({origin:"*"}))
app.use(express.json());
app.use("/api/",statusRoutes)

app.listen(8000,()=>{
    console.log("server listening on 8000 ")
})