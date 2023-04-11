const { Model, DataTypes } = require('sequelize');


class Credit extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            type: DataTypes.STRING,
            day: DataTypes.INTEGER,
            month: DataTypes.INTEGER,
            year: DataTypes.INTEGER,
            value: DataTypes.DECIMAL(4, 2)

        },
            {
                sequelize
            })
    }
}

module.exports = Credit
