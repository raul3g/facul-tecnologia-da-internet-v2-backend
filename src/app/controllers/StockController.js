import Stock from "../models/Stock";
import Product from "../models/Product";
import File from "../models/File";

class StockController {
  async store(req, res) {
    const { amount } = req.body;
    const product_id = parseInt(req.params.product_id);

    //Verifica se o produto existe
    if (!(await Product.findByPk(product_id))) {
      return res.status(404).json({ error: "Product not found!" });
    }

    const stock = await Stock.create({
      amount,
      product_id
    });

    return res.status(201).json(stock);
  }
  async show(req, res) {
    const id = parseInt(req.params.id);
    const stock = await Stock.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          include: {
            model: File,
            as: "files",
            attributes: ["id", "url", "name", "path"]
          }
        }
      ]
    });

    //Verifica se existe esse stock
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    return res.status(201).json(stock);
  }

  async update(req, res) {
    const id = parseInt(req.params.id);

    const stock = await Stock.findByPk(id);

    //Verifica se existe esse stock
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    const { amount } = req.body;

    const newStock = await stock.update({
      amount
    });

    return res.status(201).json(newStock);
  }

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    const stock = await Stock.findByPk(id);

    //Verifica se existe esse stock
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    await stock.destroy();
    return res.json({ message: "Success to delete stock" });
  }
}

export default new StockController();
