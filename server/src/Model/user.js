const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name:{type: String, default: null},
    email:{type:String, unique: true},
    birthday:{type:String},
    password:{type:String},
    gender:{type:String},
    token: {type:String}
    
})
module.exports = mongoose.model('user', userSchema);