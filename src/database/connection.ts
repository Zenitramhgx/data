import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const coreDB = new Sequelize(
  process.env.CORE_DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false
  }
);

const dataDB = new Sequelize(
  process.env.DATA_DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false
  }
);

const connectDB = async () => {
  try {
    await coreDB.authenticate();
    console.log('Connected to core database successfully.');
    
    await dataDB.authenticate();
    console.log('Connected to data database successfully.');
  } catch (error) {
    console.error('Unable to connect to the databases:', error);
    process.exit(1);
  }
};

export { coreDB, dataDB, connectDB };
