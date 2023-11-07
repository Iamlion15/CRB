const express=require("express")
const { SaveStatus,readErrorStatus,readStatus } =require("../controller/corporateController")
const router=express.Router();



router.post("/savestatus",SaveStatus);
router.get("/readerrorstatus",readErrorStatus);
router.get("/readstatus/:accountnumber",readStatus)



module.exports=router