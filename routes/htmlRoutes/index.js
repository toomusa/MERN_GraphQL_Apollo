const router = require("express").Router();
const authMiddlewares = require("../../middlewares/authMiddlewares");
const passportService = require("../../services/passport")

router.route("/")
    .get( (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

router.route("/test")
    .get(authMiddlewares.requireAuth, (req, res) => {
        res.send(req.user);
    })

// Auth protected routes
// router.route("/")
//     .get(authMiddlewares.requireAuth, todoController.getTodos)
//     .post(authMiddlewares.requireAuth, todoController.createTodo);

module.exports = router;
