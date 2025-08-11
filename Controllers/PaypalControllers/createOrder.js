const generateAccessToken = require("./authController");
const axios = require("axios");
//import createOrderObject from "../../utils/paypalTypes";
const createOrder = async (itemsJson) => {
  try {
    const accessToken = await generateAccessToken();
    const { items } = itemsJson;
    let sumTotal = 0;
    items.forEach(
      (item) => (sumTotal += item.unit_amount.value * item.quantity)
    );

    if (accessToken) {
      const res = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              items: items,
              amount: {
                currency_code: items[0].unit_amount.currency_code, //We assume that everything is using the same currency.
                value: Math.round(sumTotal),
                breakdown: {
                  item_total: {
                    currency_code: items[0].unit_amount.currency_code,
                    value: Math.round(sumTotal),
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
                brand_name: "KM2 Services",
                shipping_preference: "NO_SHIPPING",
                locale: "en-US",
                user_action: "PAY_NOW",
                return_url:
                  process.env.RETURN_URL ||
                  "https://developer.paypal.com/docs/api/orders/v2/#orders_create",
                cancel_url:
                  process.env.CANCEL_URL ||
                  "https://www.google.com/"
              },
            },
          },
        }),
        responseType: "json",
      });

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
    throw new Error(error?.message);
  }
};

module.exports = createOrder;
