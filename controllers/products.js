const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  const { featured, company, search, sort, field } = req.query;
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

  let result = Product.find(queryObj);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // fields
  if (field) {
    const fieldList = field.split(',').join(' ');
    result = result.select(fieldList);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  if (!products.length) {
    throw new Error('404 not found');
  }
  res.status(200).json({ nbHits: products.length, data: products });
};

module.exports = { getAllProducts };
