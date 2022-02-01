const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id });

        if (!user) {
            throw new Error("Please authenticate.");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};

module.exports = auth;
