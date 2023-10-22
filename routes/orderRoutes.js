const orderController = require("../controllers/orderColtroller")

const Router = require("express").Router()


Router.get("/getorders/:buyer", orderController.getOrders)
Router.post('/addorder', orderController.addOrder)


module.exports = Router
