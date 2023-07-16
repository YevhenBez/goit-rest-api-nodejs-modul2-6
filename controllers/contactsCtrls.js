const Joi = require("joi");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const listContactsCtrls = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
    listContactsCtrls
}