const paypalPlan = require("../../Controllers/PaypalControllers/paypalPlan");

const paypalPlanHandler = async (req, res) => {
  try {
    const { productId } = req.body;
    const answer = await paypalPlan(productId);

    return answer.status == "success"
      ? res.status(200).json(answer)
      : res.status(400).json(answer);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = paypalPlanHandler; 
