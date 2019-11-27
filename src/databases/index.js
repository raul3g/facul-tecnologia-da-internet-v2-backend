import Sequelize from "sequelize";

//Importando os models

import databaseConfig from "../config/database";

//Colocar todos os models
// const models = [User, File, Product, Order, OrderProduct];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
