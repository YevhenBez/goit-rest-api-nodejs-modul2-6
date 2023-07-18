const express = require("express");

const ctrl = require("../../controllers/contactsCtrls");

const validateBody = require("../../middlewares/validateBody");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.listContactsCtrls);

// router.get("/:id", ctrl.getContactByIdCtrls);

router.post("/", validateBody(schemas.addSchema), ctrl.addContactCtrls);

// router.delete("/:id", ctrl.removeContactCtrls);

// router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContactCtrls);

module.exports = router;
