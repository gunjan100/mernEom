const Categorey = require("../models/Categorey");
const slugfy = require('slugify')

const createCategorey = async(req, resp)=>{
    try {
        const{name,slug,desc} = req.body
        if(!name) {
            return resp.status(401).json({success:false, msg:"name is required"})
        }
        const existName = await Categorey.findOne({name:name})
        if(existName){
            return resp.status(404).json({success:false, msg:"Name already exist"})
        }

        const Categoery = await Categorey.create({
            name:name,
            slug:slugfy(name),
            desc:desc

        })
        resp.status(201).json({success:true, msg:"categorey Created", Categoery})
        
    } catch (error) {
        console.log(error);
        
    }

}

const getAllCate = async(req, resp)=>{
    try {
        const getCate = await Categorey.find()
        resp.status(201).json({success:true, getCate})
    } catch (error) {
        console.log(error);
        
    }

}

const updateCategorey =async(req, resp)=>{
    try {
        const updatedData = req.body
        const {id} = req.params
        await Categorey.updateOne({_id:id}, {$set:updatedData})
        return resp.status(200).json({success:true, msg:"Categorey Uapdated Successfully..", updatedData})
    } catch (error) {
        console.log(error);
    }

}

const deleteCategoreyById =async(req, resp) =>{
    try {
        const {id} = req.params
        await Categorey.deleteOne({_id:id})
        resp.status(201).json({success:true, msg:"Categorey Deleted.."})
    } catch (error) {
        console.log(error);
        
    }
}

const getSingleCtaegorey = async(req, resp) =>{
    try {
        const id = req.params.id
        const categorey = await Categorey.findOne({_id:id})
        resp.status(201).json({success:true, categorey})
    } catch (error) {
        console.log(error);
    }

}

module.exports = {createCategorey, getAllCate, updateCategorey,deleteCategoreyById, getSingleCtaegorey }