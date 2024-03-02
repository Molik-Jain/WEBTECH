import express from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../controllers/All_Item.js";

const router = express.Router();

router.route("/getProducts").get(allProducts);
router
  .route("/product/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);
router.route("/addProduct").post(addProduct);

export default router;
