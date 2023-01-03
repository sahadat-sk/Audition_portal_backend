const express = require("express");

const router = express.Router();

router.get("/random",(req,res)=>{
    res.json({message:"random"});
})

module.exports = router;