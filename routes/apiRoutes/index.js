const router = require("express").Router();
const apiController = require("../../controllers/apiController")
const passportService = require("../../services/passport")
const authMiddlewares = require("../../middlewares/authMiddlewares");

module.exports = router;
