import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db1', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;