const mongoose = require('mongoose');
const { productSchema } = require('./schemas');

const productModel = mongoose.model('Product', productSchema);

module.exports = {productModel };