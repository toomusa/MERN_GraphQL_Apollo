const router = require("express").Router();
const passportService = require("../../services/passport")
const { login, signup, getAllEmails } = require("../../controllers/authController");
const { requireSignIn } = require("../../middlewares/authMiddlewares");

router.route("/signup")
    .post(signup);

router.route("/login")
    .post(requireSignIn, login);

router.get('/emails', getAllEmails);

module.exports = router;
