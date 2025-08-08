const createOrder = require("../paypalControllers/createOrder");
const generateAccessToken = require("../paypalControllers/authController");
const axios = require("axios");
const paypalComplete = async (items) => {
  try {
    //Step 1: Create Order
    const theCreateOrder = await createOrder(items);

    //Step 2: Verify if the id exists, because is necessary for Capture Order
    if (!theCreateOrder || typeof theCreateOrder == null)
      return {
        status: "error",
        message: "Something went wrong with the Create Order.",
      };

    //Step 3: With the id, let's create an Capture Order. First, authentication.
    const auth = await generateAccessToken();

    if (auth) {
      const response = await axios.post(
        `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${theCreateOrder.orderId}/capture`,
        {
          headers: {
            Content_Type: "application/json",
            Authorization: `Bearer ${auth}`,
            responseType: "json",
          },
        }
      );

      const paymentData = response.body;

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
        link: theCreateOrder.paymentLink
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports= paypalComplete;