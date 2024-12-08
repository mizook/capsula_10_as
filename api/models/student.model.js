import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Student",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "students",
      timestamps: false,
    }
  );
