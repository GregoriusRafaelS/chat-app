import fs from 'fs';
import path from 'path';
import { DataTypes } from 'sequelize';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.ts')[env];

const db: any = {};

let sequelize: any;

if (config.use_env_variable) {
  sequelize = new (Sequelize as any)(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new (Sequelize as any)(config.database!, config.username!, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file));
    const modelFactory = modelModule.default || modelModule;
    
    if (typeof modelFactory === 'function') {
      const model = modelFactory(sequelize, DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
