const { ContactMongoose } = require("../models");

const listContactsCtrls = async (req, res) => {
  const result = await ContactMongoose.find();
  res.status(200).json(result);
};

module.exports = listContactsCtrls;