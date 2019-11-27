import Sequelize, { Model } from "sequelize";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        provider: Sequelize.BOOLEAN,
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: "user_id", as: "products" });
  }
}

export default User;
