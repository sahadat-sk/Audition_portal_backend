const express = require("express");
const {
    addQuestion,
    deleteQuestion,
} = require("../controllers/questionControllers");

const router = express.Router();

router.post("/addquestion", addQuestion);
router.delete("/deletequestion", deleteQuestion);
module.exports = router;
