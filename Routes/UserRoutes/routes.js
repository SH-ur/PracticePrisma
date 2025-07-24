const Router = require("express");

const {getOneUser, createSingleUser, deleteOneUser, updateOneUser} = require("../../Handlers/indexHandlers");

const userRoutes= Router();

userRoutes.get("/user", getOneUser);
userRoutes.post("/newUser", createSingleUser);
userRoutes.delete("/delUser", deleteOneUser);
userRoutes.put("/updUser/:id", updateOneUser);
module.exports = {userRoutes};