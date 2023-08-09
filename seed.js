const mongoose = require("mongoose");

const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("connection open");
  })
  .catch((err) => {
    console.log("connection error");
    console.log(err);
  });

// const p = new Product({ name: "grapes", price: 100, category: "fruit" });

// p.save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const manyProd = [
  { name: "apple", price: 200, category: "fruit" },
  { name: "potato", price: 50, category: "vegetable" },
];

Product.insertMany(manyProd)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
