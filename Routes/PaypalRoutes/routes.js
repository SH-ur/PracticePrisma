const {Router} = require("express") ;

const createOrderHandler = require("../../Handlers/PaypalHandler/createOrderHandler");
const completeOrderHandler = require("../../Handlers/PaypalHandler/completeOrder");
const paypalRoutes = Router();

paypalRoutes.post("/create-order", createOrderHandler)
paypalRoutes.post("/complete_order", completeOrderHandler);

module.exports= {paypalRoutes};
