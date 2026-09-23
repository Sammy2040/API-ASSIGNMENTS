const express = require('express');
const{ uploadProduct, etAllProducts } = require('../controller/productController');

const router = express.Router();
router.post('/upload', uploadProduct);
router.get('/getall', getAllProducts);

module.exports = router;