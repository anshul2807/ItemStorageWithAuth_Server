import { Sequelize, Model, DataTypes } from 'sequelize';

export class Item extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export const initItem = (sequelize: Sequelize) => {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      description: {
        type: new DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'items',
      sequelize,
    }
  );
};