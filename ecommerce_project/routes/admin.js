const { Router } = require("express");
const jwt = require("jsonwebtoken")
const adminMiddleware = require("../middleware/admin");
const { Admin, Product } = require("../db");
const { JWT_SECRET } = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    const token = jwt.sign({
        username
    },JWT_SECRET)
    res.json({
        token,
        message: "Admin created successfully"
    })
});

router.post('/products', adminMiddleware, async (req, res) => {
    // Implement product creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const newProduct = await Product.create({
    title,
    description,
    price
   })
   res.json({
    msg:'product created successfully',
    productId: newProduct._id
   })
});

router.get('/products', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Product.find({});
    res.json({
        product: response
    })
});

module.exports = router;