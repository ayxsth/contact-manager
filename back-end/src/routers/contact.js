const { Router } = require("express");
const upload = require("../middleware/upload");
const { save, viewAll } = require("../controllers/contact");

const router = Router();

router.get("/contacts", viewAll);

router.post(
    "/contacts",
    upload.single("upload"),
    save,
    (err, req, res, next) => {
        res.status(400).send({ error: err.message });
    }
);

router.put("/contacts:id", (req, res) => {});

router.delete("contacts:id", (req, res) => {});

module.exports = router;
