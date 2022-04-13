const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const inSale = products.filter((p) => p.category === "in-sale");
const visited = products.filter((p) => p.category === "visited");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render("index", { inSale, visited, toThousand });
  },
  search: (req, res) => {
    let search = req.query.keywords;
    let findProducts = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    res.render("results", { products: findProducts, search, toThousand });
  },
};

module.exports = controller;
