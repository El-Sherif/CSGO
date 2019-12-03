const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },password:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },resetKey:{
        type:String,
        required:false
    },gender:{
        type: String,
        enum : ['Male','Female'],
        required: true,
        default:"Male"
    },phone:{
        type:String,
        required:true,
        unique:true
    },age:{
        type:Number,
        required:true
    },balance:{
        type:Number,
        required:true
    },verified:{
        type:Boolean,
        required:false,
        default:false
    },
    cart:{
        type:{
            place:{
                type:String,
                required:true
            },
            catering:{
                type:String,
                required:true
            }
        },
        required:false
    }
})

module.exports = User =  mongoose.model('users', UserSchema)