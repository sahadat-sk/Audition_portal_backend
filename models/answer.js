"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class answer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ user, question }) {
            // define association here
            this.belongsTo(user);
            this.belongsTo(question);
        }
    }
    answer.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
            },
            text: { type: DataTypes.STRING, allowNull: true },
            options: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            fileLink: { type: DataTypes.STRING, allowNull: true },
        },
        {
            sequelize,
            modelName: "answer",
        }
    );
    return answer;
};
