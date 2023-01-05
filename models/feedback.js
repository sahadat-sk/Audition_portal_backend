"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class feedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ user }) {
            // define association here
            this.belongsTo(user);
        }
    }
    feedback.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
            },
            text: { type: DataTypes.STRING, allowNull: false },
        },
        {
            sequelize,
            modelName: "feedback",
        }
    );
    return feedback;
};
