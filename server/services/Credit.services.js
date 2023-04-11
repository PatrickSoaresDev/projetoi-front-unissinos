
const Credit = require('../model/Credit');
const sequelize = require('sequelize')


async function getListByYearAndMouth(req, res) {
    const { year, month } = req.params

    const list = await Credit.findAll({
        where: { year, month }
    })
    res.send(list)
}

async function createCredit(req, res) {
    await Credit.create(req.body)
    res.sendStatus(201)
}

async function deleteCredit(req, res) {
    await Credit.destroy({ where: { id: req.params.id } })

    res.sendStatus(200)
}

async function getSum() {
    const sum = await Credit.findOne({
        attributes: [[sequelize.fn('sum', sequelize.col('value')), 'total_credit']],

    },
    )


    return sum.dataValues.total_credit
}




module.exports = {
    getListByYearAndMouth,
    createCredit,
    deleteCredit,
    getSum
}