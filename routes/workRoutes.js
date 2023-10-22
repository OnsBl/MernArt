const workController = require("../controllers/workController")

const Router = require("express").Router()


Router.get("/getworks/:userid", workController.getWorks)
Router.get("/getworksall/:userid", workController.getWorksall)
Router.post('/addwork', workController.addWork)
Router.post('/updatework', workController.updateWork)
Router.post('/deletework', workController.deleteWork)

module.exports = Router
