
const Debit = require('../model/Debit');
const Category = require('../model/Category')
const sequelize = require('sequelize')

async function getListByYearAndMouth(req, res) {
    const { year, month } = req.params

    const list = await Debit.findAll({
        where: { year, month }, include: {
            model: Category,
        }
    })
    res.send(list)
}

async function getSum() {
    const sum = await Debit.findOne({
        attributes: [[sequelize.fn('sum', sequelize.col('value')), 'total_debit']],

    },
    )
    return sum.dataValues.total_debit
}





async function createDebit(req, res) {
    await Debit.create(req.body)

    res.sendStatus(201)
}

async function deleteDebit(req, res) {
    await Debit.destroy({ where: { id: req.params.id } })

    res.sendStatus(200)
}




module.exports = {
    getListByYearAndMouth,
    createDebit,
    deleteDebit,
    getSum
}