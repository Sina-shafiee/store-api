const Product = require('../models/product');

const getAllProducts = async (req, res, next) => {
  const { featured, company } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }

  const products = await Product.find(queryObj);

  if (!products.length) {
    throw new Error('404 not found');
  }
  res.status(200).json({ data: products });
};

module.exports = { getAllProducts };
