
const Category = require('../model/Category');
const Debit = require('../model/Debit');


async function getList(req, res) {
    const list = await Category.findAll({ include: { model: Debit, as: 'debits' } })

    res.send(list)
}





async function createCategory(req, res) {
    const { category } = req.body

    const isExist = await Category.findOne({ where: { category: category } })


    if (isExist) {
        return res.status(401).json("Category already exists")
    }

    await Category.create(req.body)

    res.sendStatus(201)
}




module.exports = {
    createCategory,
    getList
}