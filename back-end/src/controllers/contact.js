const Contact = require("../models/contact");

const save = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const contact = new Contact({
            name,
            phone
            // owner: req.user._id
        });

        await contact.addImage(req.file?.buffer);
        await contact.save();
        res.status(201).send(contact);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const view = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).send({ error: "Please enter valid id." });
        }
        res.send(contact);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const viewAll = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.send(contacts);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const update = async (req, res) => {
    const { id: _id } = req.params;
    const allowedUpdates = ["name", "phone", "image"];
    const updates = Object.keys(req.body);
    const isValidInputs = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    try {
        if (!isValidInputs || updates.length <= 0) {
            throw new Error("Please enter valid inputs.");
        }

        const contact = await Contact.findOne({
            _id
            // owner: req.user._id
        });

        if (!contact) {
            return res.status(404).send({ error: "Please enter valid id." });
        }

        updates.forEach((update) => {
            if (update !== "image") {
                contact[update] = req.body[update];
            }
        });

        await contact.addImage(req.file?.buffer);
        await contact.save();
        res.send(contact);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const remove = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const contact = await Contact.findOne({
            _id
            // owner: req.user._id
        });

        if (!contact) {
            return res.status(404).send({ error: "Please enter valid id." });
        }

        contact.remove();
        res.send(contact);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

module.exports = {
    save,
    viewAll,
    view,
    update,
    remove
};
