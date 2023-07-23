const { ContactMongoose } = require("../models");

const addContactCtrls = async (req, res) => {
  const result = await ContactMongoose.create(req.body);
  res.status(201).json(result);
};

module.exports = addContactCtrls;