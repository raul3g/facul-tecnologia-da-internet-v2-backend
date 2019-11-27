import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes";

import "./databases";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  }

  routes() {
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
    this.server.use(routes);
  }
}

export default new App().server;
