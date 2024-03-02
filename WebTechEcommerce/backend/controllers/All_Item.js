import { Products } from "../models/ProductsModel.js";


export const allProducts = async (req,res)=>{
    try {
        const items = await Products.find();

        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Products.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, color, size, image,brand , category, relevance } = req.body;

        const updatedProduct = await Products.findByIdAndUpdate(id, { name, price, color, size, image ,brand, category, relevance }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, price, color, size, image,brand , category, relevance } = req.body;

        const newProduct = new Products({ name, price, color, size, image,brand , category, relevance });
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

