const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");

const Product = require("./models/product");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connection open");
  })
  .catch((err) => {
    console.log("connection error");
    console.log(err);
  });

const categories = ["fruit", "vegetable", "dairy"];

//app.use(express.static(path.join(__dirname), "public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  const newProd = new Product(req.body);
  await newProd.save();
  res.redirect(`/products/${newProd._id}`);
});

app.get("/products/:id", async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const productFound = await Product.findById(id);
  // console.log(productFound);
  res.render("products/edit", { productFound, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const proEd = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${proEd._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const pro = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(port, () => {
  console.log(`listening to the ${port}`);
});
