const getOneUser = require("./UserHandlers/getUserHandler");
const createSingleUser = require("./UserHandlers/createUserHandler");
const deleteOneUser = require("./UserHandlers/deleteUserHandler");
const updateOneUser = require("./UserHandlers/updateUserHandler");

module.exports= {getOneUser, createSingleUser, deleteOneUser, updateOneUser};