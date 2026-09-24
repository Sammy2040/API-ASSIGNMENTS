const productModel = require('../model/productModel');
const studentModel = require('../model/studentModel');
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
        const product = await productModel.create(
            {
                name, description, price, category, stock, quantity, image

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