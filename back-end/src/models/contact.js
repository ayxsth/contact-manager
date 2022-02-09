const fs = require("fs");
const mongoose = require("mongoose");
const imgur = require("imgur");
const sharp = require("sharp");

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
        },
        image: {
            type: String,
            default: "https://i.imgur.com/tdi3NGa.png"
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        favorite: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

contactSchema.methods.addImage = async function (imageBuffer) {
    if (imageBuffer) {
        await sharp(imageBuffer)
            .resize({
                width: 350,
                height: 350
            })
            .png()
            .toFile("image.png");

        const { link: image } = await imgur.uploadFile("image.png");

        this.image = image;

        fs.unlinkSync("image.png");
    }
};

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
