import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
    try {
        const { orderItems } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                message: "No order items",
            })
        }

        let totalPrice = 0;
        const processedOrderItems = [];
        const productMap = {};

        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            
            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                })
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }
        
            productMap[item.product] = product;  // save product for later use.
        }

        for (const item of orderItems) {
            const product = productMap[item.product];
            
            totalPrice += item.quantity * product.price;

            processedOrderItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price
            });

            product.stock -=item.quantity;
            await product.save();
        }

        const order = await Order.create({
            user: req.user._id,
            orderItems: processedOrderItems,
            totalPrice
        });
        
        res.status(201).json({
            message: "Order created successfully",
            order,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}