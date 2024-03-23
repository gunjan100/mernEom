const { models } = require('mongoose')
const {model, Schema} = require('mongoose')

const categoreySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

const Categorey = new model('Categorey', categoreySchema)

module.exports = Categorey