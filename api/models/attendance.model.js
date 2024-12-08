import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "Attendance",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      studentid: { type: DataTypes.INTEGER, allowNull: false },
      classname: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "attendances",
      timestamps: false,
    }
  );
