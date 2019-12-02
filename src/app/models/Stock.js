import Sequelize, { Model } from "sequelize";

class Stock extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "products"
    });
  }
}

export default Stock;
