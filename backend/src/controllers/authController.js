const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const { email, password, name, phone, timezone } = req.body;
    const user = await authService.registerUser({ email, password, name, phone, timezone });
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser({ email, password });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe };
