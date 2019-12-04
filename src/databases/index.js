import Sequelize from "sequelize";

//Importando os models
import User from "../app/models/User";
import Product from "../app/models/Product";
import File from "../app/models/File";
import Stock from "../app/models/Stock";
import Order from "../app/models/Order";
import OrderProduct from "../app/models/OrderProduct";

import databaseConfig from "../config/database";

//Colocar todos os models
const models = [User, Product, File, Stock, Order, OrderProduct];

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
