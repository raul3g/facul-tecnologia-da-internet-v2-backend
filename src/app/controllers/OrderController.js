import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";
import File from "../models/File";

import { Op } from "sequelize";

class OrderController {
  async index(req, res) {
    let limit = req.query.limit || 10;
    let offset = limit * (req.query.offset || 0);

    const orders = await Order.findAll({
      where: { [Op.and]: [{ user_id: req.userId }, { status: false }] },
      include: [
        {
          model: Product,
          as: "products",
          include: [{ model: File, as: "files" }]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });

    return res.json(orders);
  }

  async store(req, res) {
    const product_id = parseInt(req.params.product_id);
    const { user_id, amount } = req.body;

    if (!(await User.findByPk(user_id))) {
      return res.status(404).json({ error: "User not found" });
    }

    const product = await Product.findByPk(product_id);

    //Verifica se esse produto existe
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [order, created] = await Order.findOrCreate({
      where: { [Op.and]: [{ status: false }, { user_id }] },
      defaults: {
        user_id
      }
    });
    // const teste = await order.getProducts({ where: { id: product.id } });
    // //Verifica se esse produto já existe no pedido
    // if (teste) {
    // }

    await order.addProduct(product, { through: { amount } });

    return res.status(201).json(order);
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const product_id = parseInt(req.params.product_id);

    const [product] = await order.getProducts({ where: { id: product_id } });

    //Verifica se esse produto existe
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.OrderProduct.amount = req.body.amount;

    await product.OrderProduct.save();
    return res.json(product);
  }

  async destroy(req, res) {
    const product_id = parseInt(req.params.product_id);

    const product = await Product.findByPk(product_id);

    //Verifica se esse produto existe
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const id = parseInt(req.params.id);
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await order.removeProduct(product);
    return res.status(200).send();
  }
}

export default new OrderController();
