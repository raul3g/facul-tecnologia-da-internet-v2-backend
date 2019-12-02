import Product from "../models/Product";
import User from "../models/User";
import File from "../models/File";

class ProductController {
  //Listando os produtos
  async index(req, res) {
    let limit = req.query.limit || 4;
    let offset = limit * (req.query.offset || 0);
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });
    return res.json(products);
  }

  //Criando um produto
  async store(req, res) {
    let user_id = parseInt(req.params.user_id);
    //Verifica se o user tem permissao para criar produtos
    if (user_id !== req.userId) {
      return res.status(401).json({ error: "You not permission" });
    }
    //Verifica se o usuario existe
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { originalname, filename: path } = req.file;
    const { name, description, price } = req.body;
    //Cria a imagem do produto
    const file = await File.create({
      name: originalname,
      path
    });
    //Verifica se o arquivo existe
    if (!file) {
      return res.status(400).json({ error: "Failed to create file" });
    }
    //Cria o produto
    const products = await Product.create({
      name,
      user_id,
      img_id: file.id,
      description,
      price
    });
    //Retorna o produto criado
    return res.status(201).json(products);
  }

  //Retorna os dados de um produto
  async show(req, res) {
    //Procura o produto
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: File,
        as: "files"
      }
    });
    //Verifica se o produto existe
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    //Retorna o produto
    return res.json(product);
  }

  //Atualiza os dados do produto
  async update(req, res) {
    const product = await Product.findByPk(parseInt(req.params.id));
    //Verifica se o produto existe
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let user_id = parseInt(product.user_id);
    //Verifica se o usuário tem permissão para modificar esse produto
    if (user_id !== req.userId) {
      return res.status(401).json({ error: "You not permission" });
    }

    let { name, description, price } = req.body;
    let data = { name, description, price };
    let newProduct;
    //Verifica se esta auterando o imagem do produto
    if (req.file) {
      const { originalname, filename: path } = req.file;
      //Cria uma nova imagem pro produto
      const file = await File.create({
        name: originalname,
        path
      });

      data.img_id = file.id;
      const idDestroy = product.id;
      //Atualiza os dados do produto
      newProduct = await product.update(data);

      //Deleta a imagem antiga
      const fileDestroy = await File.findByPk(idDestroy);

      if (fileDestroy) {
        await fileDestroy.destroy();
      }
    } else {
      //Atualiza os dados do produto
      newProduct = await product.update(data);
    }

    //Retorna o produto
    return res.json(newProduct);
  }

  //Deleta um produto
  async destroy(req, res) {
    const product = await Product.findByPk(parseInt(req.params.id));
    //Procura se existe o produto
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    //Verifica se o usuário tem permissão para modificar esse produto
    if (req.userId !== parseInt(product.user_id)) {
      return res.status(401).json({ error: "You not permission" });
    }

    //Deleta a imagem e esse produto
    const files = await File.findByPk(product.img_id);
    await product.destroy();
    await files.destroy();

    return res.json({ message: "Success to delete product" });
  }
}

export default new ProductController();
