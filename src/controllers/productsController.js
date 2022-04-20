const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products, toThousand });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    const productId = req.params.id;
    const product = products.find((p) => p.id === Number(productId));

    res.render("detail", { product });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    let id = products[products.length - 1].id + 1;
    let image = "default-image.png";
    console.log(req.file);
    if (req.file) {
      image = req.file.filename;
    }

    let newProduct = {
      id,
      ...req.body,
      image,
    };

    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");

    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    const productId = req.params.id;
    const productToEdit = products.find((p) => p.id === Number(productId));

    res.render("product-edit-form", { productToEdit });
  },
  // Update - Method to update
  update: (req, res) => {
    const productId = Number(req.params.id);
    let productToEdit = products.find((p) => p.id === productId);

    let image = "default-image.png";
    console.log(req.file);
    if (req.file) {
      image = req.file.filename;
    }

    productToEdit = {
      ...req.body,
      id: productId,
      image,
    };

    const updatedProducts = products.map((p) => {
      if (p.id === productToEdit.id) {
        return (p = { ...productToEdit });
      }
      return p;
    });

    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(updatedProducts),
      "utf-8"
    );

    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const productId = Number(req.params.id);
    const finalProducts = products.filter((p) => p.id != productId);

    fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts), "utf-8");
    res.redirect("/");
  },
};

module.exports = controller;
