const createOrder = require("../../Controllers/PaypalControllers/createOrder");

const createOrderHandler = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({
        status: "error",
        message: "We need the body to test this out.",
      });

    const answer = await createOrder(req.body);

    return answer != null
      ? res.status(200).json(answer)
      : res.status(400).json({ status: "error", message: answer });
  } catch (error) {
    return res.status(500).json(error?.message);
  }
};

module.exports = createOrderHandler;
