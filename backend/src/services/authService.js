const { User } = require('../models');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

const authService = {
    //resigter user
    async registerUser({ email, password, name, phone, timezone }) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            const err = new Error('Email already in use');
            err.status = 409;
            throw err;
        }
        const user = await User.create({ email, password, name, phone, timezone });
        return user;
    },
    //login user
    async loginUser({ email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            const err = new Error('Invalid credentials');
            err.status = 401;
            throw err;
        }
        
        const token = jwt.sign({ id: user.id }, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
        return { token, user };
    },
    //get user by id
    async getUserById(id) {
        return User.findByPk(id);
    } 
};

module.exports = authService;