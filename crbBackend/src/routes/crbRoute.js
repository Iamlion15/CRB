const express=require("express")
const { SaveStatus,readErrorStatus,readSuccessStatus } =require("../controller/CrbController")
const router=express.Router();



router.post("/addstatus",SaveStatus);
router.get("/readerrorstatus",readErrorStatus);
router.get("/readsuccessstatus",readSuccessStatus)



module.exports=router