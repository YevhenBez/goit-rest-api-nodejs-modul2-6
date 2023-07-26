const { ContactMongoose } = require("../models");

const { HttpError } = require("../helpers");

const removeContactCtrls = async (req, res) => {
  const { id } = req.params;
  const result = await ContactMongoose.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContactCtrls;
