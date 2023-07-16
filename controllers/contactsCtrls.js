const Joi = require("joi");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");
const ctrlWrapper  = require("../helpers/ctrlWrapper");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const listContactsCtrls = async (req, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  
}

const getContactByIdCtrls = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  
}

const addContactCtrls = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `${error.message} : missing required name field`);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  
}

const removeContactCtrls = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

const updateContactCtrls = async (req, res, next) => {
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
}

module.exports = {
    listContactsCtrls: ctrlWrapper(listContactsCtrls),
    getContactByIdCtrls: ctrlWrapper(getContactByIdCtrls),
    addContactCtrls: ctrlWrapper(addContactCtrls),
    removeContactCtrls,
    updateContactCtrls
}