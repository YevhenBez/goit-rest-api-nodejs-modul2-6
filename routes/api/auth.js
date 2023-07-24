const express = require("express");

const ctrl = require("../../controllers/authCtrls");

const { validateBody } = require("../../middlewares");

const { schemasAuth } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemasAuth.registerSchema), ctrl.register)

module.exports = router;