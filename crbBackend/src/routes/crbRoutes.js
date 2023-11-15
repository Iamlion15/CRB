const express=require("express")
const {logincrb } =require("../controller/CRBController")
const {initialiseCollateral,initialiseConsumer,initialiseCorporate}=require("../controller/operationController")
const router=express.Router();

router.get("/tokencrb",logincrb)
router.get("/collateral/initialise",initialiseCollateral)
router.get("/corporate/initialise",initialiseCorporate)
router.get("/consumer/initialise",initialiseConsumer)



module.exports=router