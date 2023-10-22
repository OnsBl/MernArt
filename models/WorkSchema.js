
const mongoose = require('mongoose')

const workSchema = mongoose.Schema({
    title:String,
    description: String,
    user:{ type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    price: { type: Number, default: 0 },
    mediaPath: String,
     
}, {
    timestamps: true
})


const Work = mongoose.model('Work', workSchema)

module.exports = Work