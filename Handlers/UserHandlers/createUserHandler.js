const  newUser = require("../../Controllers/UserControllers/newUser");

const createSingleUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    if (
      typeof username != "string" ||
      typeof email != "string" ||
      typeof role != "string"
    )
      res.status(400).json("All of these data inputs must be of string type.");

    const answer = await newUser(req.body);
    answer.data ? res.status(200).json(answer) : res.status(400).json(answer);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

module.exports= createSingleUser;
