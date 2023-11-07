const express=require("express")
const {logincrb } =require("../controller/CRBController")
const {initialiseCollateral}=require("../controller/operationController")
const router=express.Router();

router.get("/tokencrb",logincrb)
router.get("/collateral/initialise",initialiseCollateral)



module.exports=router