const { ContactMongoose } = require("../models");

const { HttpError } = require("../helpers");

const updateStatusContactCtrls = async (req, res) => {
  const { id } = req.params;
  const result = await ContactMongoose.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateStatusContactCtrls;
