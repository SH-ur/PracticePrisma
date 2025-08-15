const axios = require("axios");
const generateAccessToken = require("../authController");

const paypalSuscription = async (planId, subscriptionInfo) => {
  try {
    if (!planId) return { status: "error", message: "planId required." };
    const { shipping_value, subscriberInfo, address } = subscriptionInfo;
    const auth = await generateAccessToken();
    if (auth) {
      const res = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v1/billing/subscriptions",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        data: JSON.stringify({
          plan_id: `${planId}`,
          start_time: new Date(),
          quantity: "1",
          shipping_amount: {
            currency_code: "USD",
            value: shipping_value,
          },
          subscriber: {
            name: {
              given_name: subscriberInfo.name,
              surname: subscriberInfo.lastname,
            },
            email_address: subscriberInfo.email_address,
            shipping_address: {
              name: {
                full_name: `${subscriberInfo.name} ${subscriberInfo.lastname}`,
              },
              address: address
                ? address
                : {
                    address_line_1: "2211 N First Street",
                    address_line_2: "Building 17",
                    admin_area_2: "San Jose",
                    admin_area_1: "CA",
                    postal_code: "95131",
                    country_code: "US",
                  },
            },
          },
          application_context: {
            locale: "en-US",
            shipping_preference: "SET_PROVIDED_ADDRESS",
            user_action: "SUBSCRIBE_NOW",
            return_url:
              process.env.RETURN_URL_SUBSCRIPTION ||
              "https://www.perplexity.ai/",
            cancel_url:
              process.env.CANCEL_URL_SUBSCRIPTION ||
              "https://www.perplexity.ai/",
          },
        }),
      });
      const answer = res.data.links.find((link) => link.rel == "approve").href;

      return res
        ? {
            status: "success",
            message: "Suscription succesfully created",
            suscriptionLink: answer,
            suscriptionInfo: res.data,
          }
        : {
            status: "error",
            message: "The Suscription failed. Try again later.",
          };
    } else
      return {
        status: "error",
        message: "Access token failed. Try again later.",
      };
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.message);
  }
};

module.exports = paypalSuscription;
