const deleteUser = require("../../Controllers/UserControllers/deleteUser");

const deleteOneUser = async(req, res)=>{
    try {
        const {id} = req.body;
        if(!id) res.status(400).json({message: "Sorry but the id is missing."});

        const answer= await deleteUser(id);

        answer != undefined ? res.status(200).json(answer) : res.status(400).json({message: "Something went wrong deleting this user. It seems like the results are undefined."});

    } catch (error) {
        res.status(500).json(error?.message)
    }
}

module.exports= deleteOneUser;