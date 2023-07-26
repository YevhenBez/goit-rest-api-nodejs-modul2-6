const { ContactMongoose } = require("../models");

const addContactCtrls = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ContactMongoose.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = addContactCtrls;