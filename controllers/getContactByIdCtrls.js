const { ContactMongoose } = require("../models");

const { HttpError } = require("../helpers");

const getContactByIdCtrls = async (req, res) => {
  const { id } = req.params;
  const result = await ContactMongoose.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactByIdCtrls;