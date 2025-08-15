const catalogProduct = require("../../Controllers/PaypalControllers/catalogProductPaypal");

const catalogPHandler = async (req, res) => {
  try {
    if(!req.body) return res.status(400).json({status: "error", message:"The body with the product Informatino is required, please."})
    const answer = await catalogProduct(req.body);

    return answer.status == "success"
      ? res.status(200).json(answer)
      : res.status(400).json(answer);
  } catch (error) {
    
    return res.status(500).json(error.message);
  }
};

module.exports= catalogPHandler;
