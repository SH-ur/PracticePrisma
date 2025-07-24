const updUser = require("../../Controllers/UserControllers/updUser");

const updateOneUser = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!req.body) res.status(400).json({message: "I think we need the body if you want an update, won't you?"})
        else if (!id) res.status(400).json({message: "We need the id to locate the right user and update it."});
        
        const answer = await updUser(req.body, id);
console.log(answer);
        answer?.updatedData ? res.status(200).json(answer) : res.status(400).json(answer);
    } catch (error) {
        res.status(500).json(error?.message)
    }
}

module.exports = updateOneUser;