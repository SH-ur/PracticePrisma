const axios = require("axios");
const generateAccessToken = require("../authController");

const suspend = async (subscriptionId, reason) => {
  try {
    if (!subscriptionId)
      return { status: "error", message: "subscriptionId required." };
    const auth = await generateAccessToken();
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/suspend`,
      method: "post",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    });
    
    return response.status == 204
      ? {
          status: "success",
          message: "Subscription Suspended Successfully",
        }
      : { status: "error", message: "Something went wrong, try again later." };
  } catch (error) {
    throw new Error(error?.message);
  }
};

module.exports = suspend;
