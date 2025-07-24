const {Router} = require("express");

const {userRoutes} = require("./UserRoutes/routes");

const router = Router();

router.use(userRoutes);

module.exports = router;