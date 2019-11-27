import { Router } from "express";
import multer from "multer";
import Auth from "./app/middlewares/auth";
import multerConfig from "./config/multer";

//Importando os Controllers
import SessionController from "./app/controllers/SessionController";
import UserController from "./app/controllers/UserController";

//Importando os Validators
import { SessionStore } from "./app/validators/Session";
import { UserStore, UserUpdate } from "./app/validators/User";

const routes = Router();
// const upload = multer(multerConfig);

routes.post("/sessions", SessionStore, SessionController.store);
routes.post("/user", UserStore, UserController.store);

//Middleware de authentication
routes.use(Auth);

routes.put("/user/:id", UserUpdate, UserController.update);


export default routes;
