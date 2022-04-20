// ************ Require's ************
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// ************ Controller Require ************
const productsController = require("../controllers/productsController");

//MULTER CONFIG

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = path.join(__dirname, "../../public/images/products");
    console.log(folder);
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    console.log(file);
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// /*** GET ALL PRODUCTS ***/
router.get("/", productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get("/create", productsController.create);
router.post("/", upload.single("image"), productsController.store);

/*** GET ONE PRODUCT ***/
router.get("/detail/:id", productsController.detail);

// /*** EDIT ONE PRODUCT ***/
router.get("/edit/:id", productsController.edit);
router.patch("/edit/:id", upload.single("image"), productsController.update);

// /*** DELETE ONE PRODUCT***/
router.delete("/:id", productsController.destroy);

module.exports = router;
