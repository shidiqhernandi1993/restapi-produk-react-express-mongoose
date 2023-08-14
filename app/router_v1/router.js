const router = require("express").Router();
const ProductController = require("./controller");

router.get("/product", ProductController.index);
router.get("/product/:id", ProductController.view);
router.post("/product", ProductController.store);
router.put("/product/:id", ProductController.update);
router.delete("/product/:id", ProductController.destroy);

module.exports = router;
