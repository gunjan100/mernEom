const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const productSchema = new Schema({
    name:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true 
    },
    slug:{
        type:String,
        required:true 
    },
    desc:{
        type:String,
        required:true 
    },
    category:{ 
        type:Schema.ObjectId, 
        ref:"Categorey", // Assuming Category is the name of your category model
        required:true
    },
    qnty:{
        type:Number,
        required:true
    },
    shipping:{
        type:Boolean
    },
    photo: {
        type: String
    }
}, {timestamps:true});

const Product = model('Product', productSchema); 
module.exports = Product;
