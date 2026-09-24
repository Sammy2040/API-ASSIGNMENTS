const productModel = require('../model/productModel');
const studentModel = require('../model/studentModel');
const cloudinary = require('../config/cloudinary');
/**
 * create  upload Product 
 * get all .
 * get one
 * update : update product (stock)
 * delete
 */

//create / upload
const uploadProduct = async (req, res) => {
    try {
        const getStudentID = await studentModel.findById(req.params.userId);
        const { name, price, description, category, quantity, stock, image } = req.body;
        if (!getStudentID) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required....please upload an image"
            });
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.secure_url;

        const product = await productModel.create(
            {
                name, description, price, category, stock, quantity, image: imageUrl

            });

        await getStudentID.products.push(product._id);
        await getStudentID.save();
        return res.status(201).json(
            {
                message: 'Product uploaded successfully', product

            });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//get all
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message: "All products fetched successfully",
            data: products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadProduct,
    getAllProducts
}; 