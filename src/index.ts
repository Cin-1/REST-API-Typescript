require("dotenv").config();
import App from "./app";
import db from "./database";

db();
const app = new App();
app.start();
