const { Router } = require("express");

const createOrderHandler = require("../../Handlers/PaypalHandler/createOrderHandler");
const completeOrderHandler = require("../../Handlers/PaypalHandler/completeOrder");
const catalogPHandler = require("../../Handlers/PaypalHandler/catalogProduct");
const paypalPlanHandler = require("../../Handlers/PaypalHandler/paypalPlanHandler");
const paypalSuscriptionHandler = require("../../Handlers/PaypalHandler/subscription/paypalSuscriptionHandler");
const suspendHandler = require("../../Handlers/PaypalHandler/subscription/suspendHandler");
const activateHandler = require("../../Handlers/PaypalHandler/subscription/activateHandler");
const cancelHandler = require("../../Handlers/PaypalHandler/subscription/cancelHandler");
const paypalRoutes = Router();

paypalRoutes.post("/create-order", createOrderHandler);
paypalRoutes.post("/complete_order", completeOrderHandler);
paypalRoutes.post("/create_paypal_product", catalogPHandler);
paypalRoutes.post("/create_paypal_plan", paypalPlanHandler);
paypalRoutes.post("/create_subscription", paypalSuscriptionHandler);
paypalRoutes.post("/activate_subscription", activateHandler);
paypalRoutes.post("/cancel_subscription", cancelHandler);
paypalRoutes.post("/suspend_subscription", suspendHandler);

module.exports = { paypalRoutes };
