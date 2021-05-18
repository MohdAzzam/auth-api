'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    res.status(403).send('Invalid Login');
    // _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}
