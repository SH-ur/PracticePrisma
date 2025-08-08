const getUser = require("../../Controllers/UserControllers/getUser");

const getOneUser = async(req,res)=>{
    try {
        const {username} = req.query;

        if(username){
            const theUser = await getUser(username);
            
            theUser?.data ? res.status(200).json(theUser): res.status(400).json(theUser);
        } else {
            res.status(400).json("We can't continue if we don't have the user's username")
        }
    } catch (error) {
        res.status(500).json(error?.message)
    }
}

module.exports = getOneUser;