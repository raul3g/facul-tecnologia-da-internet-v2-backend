import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users"
    });
    this.belongsToMany(models.Product, {
      foreignKey: "order_id",
      through: models.OrderProduct,
      as: "products"
    });
  }
}

export default Order;
