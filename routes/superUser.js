const express = require("express");
const {
    changeRole,
    pushRound,
    deleteRound,
    stopRound,
} = require("../controllers/superUserController");

const router = express.Router();

router.put("/changerole", changeRole);
router.post("/pushround", pushRound);
router.put("/stopround",stopRound);

//for testing..
router.delete("/deleteround", deleteRound);

module.exports = router;
