const { ContactMongoose } = require("../models");

const listContactsCtrls = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await ContactMongoose.find({owner}, "", {skip, limit});
  res.status(200).json(result);
};

module.exports = listContactsCtrls;