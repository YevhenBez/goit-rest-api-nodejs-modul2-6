const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts");

// const { HttpError } = require("../../helpers/HttpError");

const ctrl = require("../../controllers/contactsCtrls");

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get("/", ctrl.listContactsCtrls);

router.get("/:id", ctrl.getContactByIdCtrls);

router.post("/", ctrl.addContactCtrls);

router.delete("/:id", ctrl.removeContactCtrls);

router.put("/:id", ctrl.updateContactCtrls);

module.exports = router;
