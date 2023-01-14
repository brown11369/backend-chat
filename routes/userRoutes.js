const { register,login,setavatar,getallusers } = require("../controllers/usercontroller");

const router=require("express").Router();



router.post("/register",register);
router.post("/login",login)
router.post("/setavatar/:id",setavatar)
router.get("/getallusers/:id",getallusers)



module.exports=router;