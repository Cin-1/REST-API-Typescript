import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iss6b.mongodb.net/asap?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("database connected");
  } catch (err) {
    console.log(err, "Something went wrong with the database");
  }
}
