const { sequelize } = require("../models");
const {
    models: { user, round },
} = sequelize;

const changeRole = async (req, res) => {
    const { id, role } = req.body;
    if (!id || !role)
        return res.status(400).json({ message: "fill all the fields" });
    if (id === req?.user?.id)
        return res
            .status(403)
            .json({ message: "not allowed to change your role" });
    try {
        const currentUser = await user.findOne({ where: { id } });
        currentUser.role = role;
        await currentUser.save();
        res.status(201).json({ message: "role changed" });
    } catch (err) {
        res.status(500).json({ message: "could not change role" });
    }
};

const pushRound = async (req, res) => {
    try {
        const currRoundNo = await round.findAll();

        await round.create({
            no: currRoundNo.length + 1,
            status: true,
            duration: 90,
        });
        res.status(201).json({ message: "Round pushed" });
    } catch (err) {
        res.status(500).json({ message: "could not push round" });
    }
};

const stopRound = async (req, res) => {
    try {
        const allRounds = await round.findAll();
        const currRoundNo = allRounds.length;

        let currRound = await round.findOne({ where: { no: currRoundNo } });
        currRound.status = false;
        currRound.save();
        res.status(201).json({ message: "Round stopped" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "could not stop round" });
    }
};

//for testing..
const deleteRound = async (req, res) => {
    const { no } = req.body;

    const roundToBeDeleted = await round.findOne({ where: { no } });
    await roundToBeDeleted.destroy();
    res.sendStatus(201);
};

module.exports = { changeRole, pushRound, deleteRound, stopRound };
