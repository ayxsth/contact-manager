const User = require("../models/user");

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

module.exports = {
    signup,
    signin
};
