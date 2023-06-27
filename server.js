import app from "./app.js";
import mongoose from "mongoose";

const DB_HOST =
  "mongodb+srv://Alexey:jLLsOqtxgNKPiBO0@cluster0.1sds29x.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// jLLsOqtxgNKPiBO0;
