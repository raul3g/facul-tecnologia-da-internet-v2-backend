import Order from "../models/Order";
import Product from "../models/Product";
import Stock from "../models/Stock";
import File from "../models/File";

class BuyController {
  async store(req, res) {
    const id = parseInt(req.params.id);
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products"
        }
      ]
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.products.map(async product => {
      const stock = await Stock.findOne({ where: { product_id: product.id } });
      stock.amount = stock.amount - product.OrderProduct.amount;
      await stock.save();
    });

    order.status = true;
    await order.save();
    return res.send();
  }
}

export default new BuyController();
