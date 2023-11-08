const express=require("express")
const cors=require("cors")
const dbConnect=require("./src/database/db")
const app=express();
const collateralRoutes=require("./src/routes/collateralRoutes")
const corporateRoutes=require("./src/routes/corporateRoutes")
const crbRoutes=require("./src/routes/crbRoutes")
const consumerRoutes=require("./src/routes/consumerRoutes")

//connect to the database 
dbConnect();
//middlewares
app.use(express.json())
app.use(cors({origin:"*"}));


app.use("/api/collateral",collateralRoutes)
app.use("/api/corporate",corporateRoutes)
app.use("/api/consumer",consumerRoutes)
app.use("/api/crb",crbRoutes)

app.listen(2000,()=>{
    console.log("server started successfully");
})