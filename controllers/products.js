const Product = require('../models/product');

const getAllProducts = async (req, res, next) => {
  const { featured, company, search, sort } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (search) {
    queryObj.name = { $regex: search, $options: 'i' };
  }

  const result = Product.find(queryObj);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result.sort(sortList);
  }

  const products = await result;

  if (!products.length) {
    throw new Error('404 not found');
  }
  res.status(200).json({ data: products });
};

module.exports = { getAllProducts };
