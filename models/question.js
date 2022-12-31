"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ round, answer }) {
            // define association here
            this.belongsTo(round);
            this.hasMany(answer);
        }
    }
    question.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            text: { type: DataTypes.STRING, allowNull: true },
            imageLink: { type: DataTypes.STRING, allowNull: true },
            audioLink: { type: DataTypes.STRING, allowNull: true },
            type: { type: DataTypes.STRING, allowNull: false },
            options: { type: DataTypes.ARRAY(DataTypes.STRING) },
        },
        {
            sequelize,
            modelName: "question",
        }
    );
    return question;
};
