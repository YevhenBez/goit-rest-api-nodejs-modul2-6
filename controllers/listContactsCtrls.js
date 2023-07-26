const { ContactMongoose } = require("../models");

const listContactsCtrls = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ContactMongoose.find({owner});
  res.status(200).json(result);
};

module.exports = listContactsCtrls;