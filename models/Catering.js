const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CateringSchema = new Schema({
    name:{
        type:String,
        required:true
    },menu:{
        type:[
            {
                item:{
                    type:String,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                }
            }
        ],
        required:true,
        default:[]
    },
    rating:{
        type:Number,
        required:true
    }
})

module.exports = Catering =  mongoose.model('caterings', CateringSchema)