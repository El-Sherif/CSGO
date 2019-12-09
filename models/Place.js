const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const PlaceSchema = new Schema({
    name:{
        type:String,
        required:true
    },location:{
        type:String,
        required:true
    },maximumCapacity:{
        type:Number,
        required:true
    },pricePerHour:{
        type:Number,
        required:true
    },rating:{
        type:Number,
        required:true
    }
})

module.exports = Place =  mongoose.model('places', PlaceSchema)