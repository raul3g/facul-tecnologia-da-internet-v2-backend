import Sequelize, { Model } from "sequelize";

class OrderProduct extends Model {
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
}

export default OrderProduct;
