import express from "express";

class App {
  app: express.Application;

  constructor() {
    this.app = express();
  }
  start() {
    this.app.listen(4000, () => {
      console.log("Server Running on 4000");
    });
  }
}

export default App;
