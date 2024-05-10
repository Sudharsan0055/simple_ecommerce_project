// Middleware for handling auth
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1]

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET)
    try{  if(decodedValue.username){
        next()
    }else{
        res.status(403).json({
            Msg: "you are not authenticated"
        })
    }}
    catch(e){
        res.json({
            msg:"incorrect inputs"
        })
    }     
}

module.exports = userMiddleware;