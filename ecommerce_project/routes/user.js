const { Router } = require("express");
const jwt = require("jsonwebtoken")
const router = Router();
const { User, Product } = require("../db")
const userMiddleware = require("../middleware/user");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup',  async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })
    const token = jwt.sign({username}, JWT_SECRET)
    res.json({
        token,
        msg:"User created Successfully"
    })

});

router.get('/products', async (req, res) => {
    // Implement listing all courses logic
    const response = await Product.find({});
    res.json({
       Courses:response
    })
});

router.post('/products/:productId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const productId = req.params.productId;
    const username = req.headers.username;
    User.updateOne({
        username: username
    },{
        "$push": {
            purchasedProduct:productId    
        }
    })
    .catch(function(e){
        console.log(e)
    })
    res.json({
        msg:"purchase completed"
    })
    
});

router.get('/purchasedProducts', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
   const user = await User.findOne({
    username: req.headers.username
   })
    console.log(user.purchasedProduct)
    const courses = await Product.find({
        _id:{
            "$in" : user.purchasedProduct
        }
    })
    res.json({
        Coures : courses
    })

});

module.exports = router