import Order from "../models/Order";
const PDFKit = require("pdfkit");

class ReportController {
  async index(req, res) {
    const pdf = new PDFKit();

    const orders = await Order.findAll({
      include: [
        {
          model: Product,
          as: "products",
          include: [{ model: File, as: "files" }]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    pdf.text("Teste");
    pdf.end();

    return res.download(pdf);
  }
}

export default new ReportController();
