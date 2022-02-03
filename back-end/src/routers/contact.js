const { Router } = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { save, viewAll, update, remove } = require("../controllers/contact");

const router = Router();

router.get("/contacts", auth, viewAll);

router.post(
    "/contacts",
    auth,
    upload.single("image"),
    save,
    (err, req, res, next) => {
        res.status(400).send({ error: err.message });
    }
);

router.put(
    "/contacts/:id",
    auth,
    upload.single("image"),
    update,
    (err, req, res, next) => {
        res.status(400).send({ error: err.message });
    }
);

router.delete("/contacts/:id", auth, remove);

module.exports = router;
