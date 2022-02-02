const { Router } = require("express");
const { save, viewAll } = require("../controllers/contact");

const router = Router();

router.get("/contacts", viewAll);

router.post("/contacts", save);

router.put("/contacts:id", (req, res) => {});

router.delete("contacts:id", (req, res) => {});

module.exports = router;
