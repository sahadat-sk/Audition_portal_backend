"use strict";
const { Model,UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class event extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    event.init(
        {
            id: { type: DataTypes.UUID,defaultValue:UUIDV4 ,primaryKey: true },
            username: { type: DataTypes.STRING, allowNull: false },
            time: { type: DataTypes.DATE, allowNull: false },
            event: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: "event",
        }
    );
    return event;
};
