const Product = require('../models/ProductModel'); 
const slugfy = require('slugify')

// ========================================================= ADD PRODUCT =========================================

const addProduct = async (req, res) => {
  try {
    const { name, price,  desc, category, qnty, shipping, photo } = req.body; 

    // Simple validation: Check if required fields are present and non-empty
    if (!name || !price || !desc || !category || !qnty || !shipping) { 
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // Simple validation: Check if price and quantity are numeric and non-negative
    if (isNaN(price) || isNaN(qnty) || price < 0 || qnty < 0) {
      return res.status(400).json({ success: false, message: 'Price and quantity must be numeric and non-negative.' });
    }

    // Create the product
    const newProduct = await Product.create({ 
      name,
      price,
      slug:slugfy(name),
      desc,
      category, 
      qnty,
      shipping,
      photo 
    });

    res.status(201).json({ success: true, message: 'Product added successfully.', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to add product.' });
  }
};


// ========================================================= GET ALL PRODUCT =========================================

const getAllProduct = async(req, resp)=>{
    try {
        const allProduct = await Product.find()
        resp.status(201).json({success:true, allProduct})
        
    } catch (error) {
        console.error(error)
        resp.status(500).json({ success: false, message: 'Failed to fETCH product.' });
    }
}


// ========================================================= UPDATE PRODUCT =========================================
const upadteProduct = async(req, resp)=>{
    try {
        const {id} = req.params
        const updateData = req.body
        await Product.updateOne({_id:id},{$set:updateData})
        resp.status(201).json({success:true, msg:"product Upadted Successfully.."})
        
    } catch (error) {
        console.error(error)
        resp.status(500).json({ success: false, message: 'Failed to UPDATE product.' });
    }
}


// ========================================================= GET single PRODUCT =========================================


const singleProduct = async(req, resp)=>{
    try {
        const {id} = req.params
        const singlePro = await Product.findOne({_id:id})
        resp.status(201).json({success:true, singlePro})
    } catch (error) {
        console.error(error);
        resp.status(500).json({ success: false, message: 'Failed to fetch single product.' });
    }
}

// ========================================================= DELETE ALL PRODUCT =========================================


const deleteProduct = async(req, resp)=>{
    try {
        const {id} = req.params
        await Product.deleteOne({_id:id})
        resp.status(201).json({success:true, msg:"Product Deleted Successfully.."})
    } catch (error) {
        console.error(error);
        resp.status(500).json({ success: false, message: 'Failed to Delete product.' });
    }
}

module.exports = { addProduct,getAllProduct ,upadteProduct,singleProduct, deleteProduct};
