const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Sudhar_b:Sudharsan_b@cluster0.mrozqrh.mongodb.net/ecommerce_app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedProduct: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product'
        } ]
});

const productSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    price: Number

});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = {
    Admin,
    User,
    Product
}