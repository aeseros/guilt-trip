const jwt = require('jsonwebtoken');
const secret = 'guiltsecrettrip';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, name, id }) {
    const payload = { email, name, id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};