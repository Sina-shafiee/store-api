const getAllProducts = async (req, res, next) => {
  res.status(200).json({ data: 'data' });
};

module.exports = { getAllProducts };
