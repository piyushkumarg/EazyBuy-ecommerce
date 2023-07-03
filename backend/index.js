const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Products");
const productRouters = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const cors = require("cors");

//middleware
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", productRouters.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("database connected...");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.post("/", createProduct);

server.listen(8080, () => {
  console.log("server started");
});
