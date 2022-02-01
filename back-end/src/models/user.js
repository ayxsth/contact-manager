const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter your name."],
        trim: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email address."],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [6, "Your password must be at least 6 characters long."]
    }
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) return user;
    }

    throw new Error("Invalid login credentials.");
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id.toString() },
        process.env.JWT_SECRET
    );
    return token;
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 8);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
