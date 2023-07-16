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

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `${error.message} : missing fields`);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
