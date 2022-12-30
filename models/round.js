"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class round extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ user }) {
            // define association here
            this.hasMany(user, {
                foreignKey: {
                    type: DataTypes.UUID,
                    name: "round_id",
                    as: "round",
                },
            });
        }
    }
    round.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
            },
            no: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.BOOLEAN,
            },
            duration: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "round",
            tableName: "rounds",
        }
    );
    return round;
};
