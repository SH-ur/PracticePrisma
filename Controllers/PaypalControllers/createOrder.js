const generateAccessToken = require("./authController");
const axios = require("axios");
//import createOrderObject from "../../utils/paypalTypes";
const createOrder = async (information) => {
  try {
    const accessToken = await generateAccessToken();

    if (accessToken) {
      const res = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        data: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              items: [information],
              amount: {
                currency_code: information.unit_amount.currency_code,
                value: information.unit_amount.value,
                breakdown: {
                  item_total: {
                    currency_code: information.unit_amount.currency_code,
                    value: information.unit_amount.value,
                  },
                },
              },
            },
          ],
          payment_source: {
            paypal: {
              experience_context: {
                payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
                payment_method_selected: "PAYPAL",
                brand_name: "PracticeApp: The art of Devs",
                shipping_preference_: "NO_SHIPPING",
                locale: "en-US",
                user_action: "PAY_NOW",
                rl:
                  "https://developer.paypal.com/docs/api/orders/v2/#orders_create",
                cancel_url:
                  "https://developer.paypal.com/dashboard/accounts/edit/4832939085191547745?accountName=sb-awxg144887185@personal.example.com",
              },
            },
          },
        }),
        responseType: "json",
      });
      console.log(res);

      //Se requiere es el link de approve, por lo que se puede obtener de la siguiente manera: response.data.links.find(link=> link.rel == "approve").href
      const answer = res.data.links.find(
        (link) => link.rel == "payer-action"
      ).href;
      return res
        ? {
            status: "success",
            message: "Order Created",
            orderId: res.data.id,
            paymentLink: answer,
          }
        : null;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error?.message);
  }
};

module.exports = createOrder;
