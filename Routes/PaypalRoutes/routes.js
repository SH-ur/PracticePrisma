const {Router} = require("express") ;

const createOrderHandler = require("../../Handlers/PaypalHandler/createOrderHandler");

const paypalRoutes = Router();

paypalRoutes.post("/create-order", createOrderHandler)

module.exports= {paypalRoutes};
