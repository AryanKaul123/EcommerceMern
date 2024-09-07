const productModel = require("../../models/productModel")


const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category");

        console.log("category", productCategory);

        // Array to store one product from each category
        const productPromises = productCategory.map(category => 
            productModel.findOne({ category }).exec()
        );

        const products = await Promise.all(productPromises);

        // Filter out null results in case some categories have no products
        const productByCategory = products.filter(product => product !== null);

        res.json({
            message: "Category products",
            data: productByCategory,
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


module.exports = getCategoryProduct
