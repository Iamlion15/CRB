const express=require("express")
const { SaveCollateralStatus,readCollateralErrorStatus,readCollateralStatus,logincrb } =require("../controller/CRBController")
const router=express.Router();



router.post("/savestatus",SaveCollateralStatus);
router.get("/readerrorstatus",readCollateralErrorStatus);
router.get("/readstatus/:collateralid",readCollateralStatus)
router.get("/tokencrb/",logincrb)



module.exports=router