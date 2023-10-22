const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    works:[{type: mongoose.Schema.Types.ObjectId,ref: 'Work'}],
    orders:[{type: mongoose.Schema.Types.ObjectId,ref: 'Order'}], 
},{
    timestamps: true
  })


const User=mongoose.model('User',userSchema)

module.exports=User
