import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        price: Sequelize.FLOAT
      },
      {
        sequelize
      }
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "img_id", as: "files" });
    this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });

    this.hasOne(models.Stock, { foreignKey: "product_id", as: "stocks" });

    // this.belongsToMany(models.Order, {
    //   foreignKey: "product_id",
    //   through: models.OrderProduct,
    //   as: "orders"
    // });
  }
}

export default Product;
