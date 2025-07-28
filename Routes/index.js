const {Router} = require("express");

const {userRoutes} = require("./UserRoutes/routes.js");
const { paypalRoutes } = require("./PaypalRoutes/routes")
const router = Router();

router.use("/user", userRoutes)
router.use("/paypal", paypalRoutes)

module.exports = router;