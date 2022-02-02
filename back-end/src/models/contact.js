const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the name."],
            trim: true
        },
        phone: {
            type: Number,
            required: [true, "Please enter the phone number."],
            min: [1000000, "Please enter a valid phone number."],
            max: [9999999999, "Please enter a valid phone number."]
        }
    },
    {
        timestamps: true
    }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
