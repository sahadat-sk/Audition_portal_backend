const { sequelize } = require("../models");
const {
    models: { user },
} = sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Fill all the fields" });
    }
    const duplicate = await user.findOne({ where: { email } });
    if (duplicate) {
        console.log("user already exists");
        return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
        username,
        email,
        password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "sign up successful" });
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "fill all the fields" });
    }
    const founduser = await user.findOne({ where: { email } });
    if (!founduser) {
        return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, founduser.password);
    if (!match) {
        return res.sendStatus(401);
    }

    const payload = {
        id: founduser.id,
        username: founduser.username,
        email: founduser.email,
        role: founduser.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    res.cookie("jwt", token, { httpOnly: true });

    res.status(201).json({ token });
};

module.exports = { handleSignup, handleLogin };
