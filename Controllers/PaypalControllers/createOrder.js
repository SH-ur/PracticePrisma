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
          application_context: {
            return_url:
              "https://developer.paypal.com/docs/api/orders/v2/#orders_create",
            cancel_url: "https://imgflip.com/i/5lurmz",
            //Crea unas url en el .env para poder usar la redirección oficial sin peligro.
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            brand_name: "KAMEHAMEHAAAAAAA"
          },
        }),
      });
      console.log(res.data);
      //Se requiere es el link de approve, por lo que se puede obtener de la siguiente manera: response.data.links.find(link=> link.rel == "approve").href
      return res ? res.data : null;
    }
  } catch (error) {
    console.log(error.response.data)
    throw new Error(error?.message);
  }
};

module.exports = createOrder;
