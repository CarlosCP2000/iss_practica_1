const mongoose = require('mongoose');
const { userSchema } = require('./schemas');

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel };