
const User = require("../models/UserSchema")
const Order = require("../models/OrderSchema")

const orderController = {

    getOrders:async(req,res)=>{
        const buyer = req.params.buyer;

 
        try {
            const orders = await Order.find({ buyer: buyer });
            res.send(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
  }
    },
  
    addOrder: async (req, res) => {


        const { title,description, total, user,buyer } = req.body
        if (!buyer)
            res.status(400).json({ message: "missing fields" })
        if (!description || !title ||!user ||!buyer )
            res.status(400).json({ message: "missing fields" })
        const order = await Order.create({ title : title,description: description,  user: user,buyer:buyer, total:total})
        const theBuyer = await User.findById(buyer)
        console.log('order',order)
        if (order)
            if (theBuyer)
            theBuyer.orders.push(order.id)
                await theBuyer.save();
        res.status(201).json({ message: "success" , order: order })
    },

    


}

module.exports = orderController
