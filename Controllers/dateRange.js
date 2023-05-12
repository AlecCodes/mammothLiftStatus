const express = require("express");
const liftReport = require("../Models/liftReport");

const router = express.Router();


router.get("/", async(req,res) => {
    res.json("GET ROUTE!!!")
})

router.get("/:start/:end", async (req, res) => {
    try{
        res.json({"start": req.params.start , "end": req.params.end})
    } catch(error){
        res.status(400).json(error)
    }
})

module.exports = router;