// const contacts = require("../models/contacts");

const { ContactMongoose } = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");
const ctrlWrapper  = require("../helpers/ctrlWrapper");

const listContactsCtrls = async (req, res) => {
    const result = await ContactMongoose.find();
    res.status(200).json(result);
  
}

const getContactByIdCtrls = async (req, res) => {
    const { id } = req.params;
    const result = await ContactMongoose.findById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  
}

const addContactCtrls = async (req, res) => {
   
    const result = await ContactMongoose.create(req.body);
    res.status(201).json(result);
  
}

const removeContactCtrls = async (req, res) => {
    const { id } = req.params;
    const result = await ContactMongoose.findByIdAndRemove(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  
}

const updateContactCtrls = async (req, res) => {
    
    const { id } = req.params;
    const result = await ContactMongoose.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
 
}

const updateStatusContactCtrls = async (req, res) => {
    
    const { id } = req.params;
    const result = await ContactMongoose.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
 
}

module.exports = {
    listContactsCtrls: ctrlWrapper(listContactsCtrls),
    getContactByIdCtrls: ctrlWrapper(getContactByIdCtrls),
    addContactCtrls: ctrlWrapper(addContactCtrls),
    removeContactCtrls: ctrlWrapper(removeContactCtrls),
    updateContactCtrls: ctrlWrapper(updateContactCtrls),
    updateStatusContactCtrls: ctrlWrapper(updateStatusContactCtrls),
}