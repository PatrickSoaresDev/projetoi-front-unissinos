const { Model, DataTypes } = require('sequelize');


class Debit extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            description: DataTypes.INTEGER,
            local: DataTypes.STRING,
            day: DataTypes.INTEGER,
            month: DataTypes.INTEGER,
            year: DataTypes.INTEGER,
            id_category: DataTypes.INTEGER,
            value: DataTypes.DECIMAL(4, 2)

        },
            {
                sequelize
            })
    }
    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'id_category',
        })
    }
}

module.exports = Debit


