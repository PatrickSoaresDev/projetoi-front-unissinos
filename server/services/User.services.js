const { hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const User = require('../model/user');
const { Op } = require('sequelize');





async function createUser(req, res) {
    const user = req.body

    const isExist = await User.findOne({ where: { email: user.email } })


    if (isExist) {
        return res.status(401).json("Email already exists")
    }

    user.password = await hash(user.password, 8)
    await User.create(user)
    res.sendStatus(201)
}

async function createSession(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json('Incorrect email/password combination')
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
        return res.status(401).json('Incorrect email/password combination')
    }

    delete user.dataValues['password']

    const token = sign({ user }, '60905c210ab975c7e090cac820f2154c', { subject: user.id.toString(), expiresIn: '24h' });

    res.send({ token })
}



module.exports = {
    createUser,
    createSession
}