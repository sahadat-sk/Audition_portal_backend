const { sequelize } = require("../models");
const {
    models: { round, question },
} = sequelize;

const addQuestion = async (req, res) => {
    const { roundNo, text, imageLink, audioLink, type, options } = req.body;
    if (!roundNo || !type) {
        return res.status(400).json({ message: "fill all the fields" });
    }
    try {
        const no = Number(roundNo);
        const roundRef = await round.findOne({ where: { no } });
        if (!roundRef?.id) {
            return res.status(401).json({ message: "Round not found" });
        }
        await question.create({
            text,
            imageLink,
            audioLink,
            type,
            options,
            roundId: roundRef.id,
        });

        res.status(201).json({ message: "Question created" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not add question" });
    }
};

const deleteQuestion = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: "please provide id" });
    }
    try {
        const questionRef = await question.findOne({ where: { id } });
        await questionRef.destroy();
        res.status(201).json({ message: "question deleted" });
    } catch (err) {
        res.status(500).json({ message: "could not delete Question" });
    }
};

module.exports = { addQuestion, deleteQuestion };
