const generateAccessToken = require("../paypalControllers/authController");
const axios = require("axios");
const paypalComplete = async (orderId) => {
  try {
    const auth = await generateAccessToken();
    if (auth) {
      const response = await axios.post(
        `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          responseType: "json",
        }
      );
      
      const paymentData = response.data;

      if (paymentData.status !== "COMPLETED")
        return {
          status: "error",
          message:
            "Something failed when capturing this order, we do not get the Completed status.",
        };

      return {
        status: "success",
        message: "Completed Payment!",
        data: paymentData,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = paypalComplete;
