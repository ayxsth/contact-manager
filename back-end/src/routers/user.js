const { Router } = require("express");
const { signup, signin, getUser } = require("../controllers/user");
const auth = require("../middleware/auth");

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/user", auth, getUser);

module.exports = router;
