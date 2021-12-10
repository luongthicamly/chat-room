var express = require('express')
const router = express.Router();
const AuthMiddleWare = require("../Middleware/AuthMiddleware");
const AuthController = require("../Controllers/AuthController");

router.use(require('./client'));
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.use(AuthMiddleWare.isAuth);
module.exports = router;