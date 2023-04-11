const { Model, DataTypes } = require('sequelize');


class Category extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            category: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Debit, {
            foreignKey: 'id_category',
            as: 'debits'
        })
    }

}

module.exports = Category

