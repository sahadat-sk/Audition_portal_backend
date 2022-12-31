"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({round,feedback,answer}) {
            // define association here
            this.belongsTo(round)
            this.hasMany(feedback)
            this.hasMany(answer)
        }
    }
    user.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
            },
           
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rollNo: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profileBool: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "unevaluated",
            },
            role: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "s",
            },

            authMode: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "normal",
            },

            endTime: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },

            phone: {
                type: DataTypes.BIGINT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "user",
            tableName: "users"
        }
    );
    return user;
};
