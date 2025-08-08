const axios = require("axios");

const generateAccessToken = async () => {
  try {
    const response = await axios({
      url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET_KEY,
      },
    });

    return response != null && response?.data
      ? response.data.access_token
      : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = generateAccessToken;
