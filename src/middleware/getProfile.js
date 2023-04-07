const { Op } = require("sequelize");
const { Contract } = require("../model");

const getProfile = async (req, res, next) => {
  const { User } = req.app.get("models");
  const userId = req.get("user_id") || 0;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) return res.status(401).end();
  req.user = user;

  // Contract.addScope(
  //   "defaultScope",
  //   {
  //     where: {
  //       [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
  //     },
  //   },
  //   { override: true }
  // );

  next();
};
module.exports = { getProfile };
