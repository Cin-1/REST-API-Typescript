require("dotenv").config();
import App from "./app";
import db from "./database";
import morgan from "morgan";
import exphbs from "express-handlebars";

db();
const app = new App();
app.start();
