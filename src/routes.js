import { Router } from "express";
import multer from "multer";
import Auth from "./app/middlewares/auth";
import multerConfig from "./config/multer";

//Importando os Controllers
import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";
import ProductController from "./app/controllers/ProductController";
import StockController from "./app/controllers/StockController";
import OrderController from "./app/controllers/OrderController";
import BuyController from "./app/controllers/BuyController";

//Importando os Validators
import { SessionStore } from "./app/validators/Session";
import { UserStore, UserUpdate } from "./app/validators/User";
import { UserStore, UserUpdate } from "./app/validators/User";
import { ProductStore, ProductUpdate } from "./app/validators/Product";
import { StockStore, StockUpdate } from "./app/validators/Stock";
import { OrderStore, OrderUpdate } from "./app/validators/Order";

const routes = Router();
const upload = multer(multerConfig);

routes.post("/sessions", SessionStore, SessionController.store);
routes.post("/users", UserStore, UserController.store);

//Middleware de authentication
routes.use(Auth);

routes.get("/users/:id", UserController.show);

//Product
routes.get("/products", ProductController.index);
routes.post(
  "/users/:user_id/products",
  upload.single("file"),
  ProductStore,
  ProductController.store
);
routes.get("/products/:id", ProductController.show);
routes.put(
  "/users/:user_id/products/:id",
  upload.single("file"),
  ProductUpdate,
  ProductController.update
);
routes.delete("/products/:id", ProductController.destroy);

//Stock
routes.post("/products/:product_id/stocks", StockStore, StockController.store);
routes.get("/stocks/:id", StockController.show);
routes.put("/stocks/:id", StockUpdate, StockController.update);
routes.delete("/stocks/:id", StockController.destroy);

//Order
routes.post("/products/:product_id/orders", OrderStore, OrderController.store);
routes.get("/orders", OrderController.index);
routes.put(
  "/products/:product_id/orders/:id",
  OrderUpdate,
  OrderController.update
);
routes.delete("/products/:product_id/orders/:id", OrderController.destroy);

routes.post("/orders/:id/buy", BuyController.store);

export default routes;
