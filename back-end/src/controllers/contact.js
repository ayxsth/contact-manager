const multer = require("multer");
const Contact = require("../models/contact");

const save = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const contact = new Contact({
            name,
            phone
        });
        await contact.save();
        res.status(201).send(contact);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const viewAll = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const update = async (req, res) => {
    const allowedUpdates = ["name", "phone"];
    const updates = Object.keys(req.body);
    const isValidInputs = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidInputs || updates.length <= 0) {
        throw new Error("Please enter valid inputs.");
    }

    try {
        const contact = await Contact.findById(req.params.id);
        updates.forEach((update) => (contact[update] = req.body[update]));
        await contact.save();
        res.send(contact);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await Contact.findByIdAndDelete(id);
        res.send({ message: "Contact deleted successfully." });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

module.exports = {
    save,
    viewAll,
    update,
    remove
};
