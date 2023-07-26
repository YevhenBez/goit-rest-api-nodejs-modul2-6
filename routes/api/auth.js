const express = require("express");

const ctrl = require("../../controllers/authCtrls");

const { validateBody, authenticate } = require("../../middlewares");

const { schemasAuth } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemasAuth.registerSchema), ctrl.register);

router.post("/login", validateBody(schemasAuth.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;