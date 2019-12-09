const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const EventSchema = new Schema({
    type: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, time: {
        type: {
            start_time: {
                type: Date,
                required: true
            },
            end_time: {
                type: Date,
                required: true
            }
        },
        required: true
    }, Ticket_price: {
        type: Number,
        required: true
    }, Total_price: {
        type: Number,
        required: true
    }, fees_Payed: {
        type:Boolean,
        required:true,
        default:false
    }, place: {
        type: Schema.Types.ObjectId,
        ref: "Place",
        required: true
    }, owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, catering: {
        type: {
            cateringID: {
                type: Schema.Types.ObjectId,
                ref: "Catering",
                required: true
            },
            items: {
                type: [
                    {
                        itemName: {
                            type: String,
                            required: true
                        },
                        itemAmount: {
                            type: Number,
                            required: true
                        }
                    }
                ],
                required: true
            }
        },
        required: true
    }
})

module.exports = Event = mongoose.model('events', EventSchema)