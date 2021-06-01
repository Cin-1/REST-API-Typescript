import express from "express";
import morgan from "morgan";
import cors from "cors";

import routerIndex from "./routes";
import routerUsers from "./routes/users";
import authRoutes from "./routes/auth";
import emailRoutes from "./routes/email";

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }
  settings() {
    this.app.set("port", 4000);
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(routerIndex);
    this.app.use("/users", routerUsers);
    this.app.use("/auth", authRoutes);
    this.app.use("/email", emailRoutes);
  }
  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server Running on", this.app.get("port"));
    });
  }
}

export default App;
