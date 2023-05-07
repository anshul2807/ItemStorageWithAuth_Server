import { Sequelize } from 'sequelize';

const DB_DatabaseName = "db_2807";
const DB_UserName = "hadoop";
const DB_Password = "anshulsingh";
const DB_Host="db4free.net";
const sequelize = new Sequelize(DB_DatabaseName, DB_UserName, DB_Password, {
  host: DB_Host,
  dialect: 'mysql',
});

export default sequelize;