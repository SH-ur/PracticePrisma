const generateAccessToken = require("../PaypalControllers/authController");
const axios = require("axios");

const catalogProduct = async (productInformation) => {
  try {
    const auth = await generateAccessToken();
    const { name, description, type, category } = productInformation;
    if (!name) return { status: "error", message: "Name is required please." };
    else if (!description)
      return { status: "error", message: "Description is required please." };
    else if (!type)
      return { status: "error", message: "Type is required please." };
    

    if (auth) {
      const response = await axios({
        url: `${process.env.PAYPAL_BASE_URL}/v1/catalogs/products`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        data: JSON.stringify({
          name: name || "KM2 Service",
          description: description || "Testing Service for auto Billing",
          type: type || "SERVICE",
          category: category || "SOFTWARE",
        }),
      });
      console.log(response.data);
      return response
        ? {
            status: "success",
            message: "Product Created",
            productId: response.data.id,
          }
        : {
            status: "error",
            message: "There was no Answer from the Product Creation.",
          };
    }
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.message);
  }
};

module.exports = catalogProduct;
