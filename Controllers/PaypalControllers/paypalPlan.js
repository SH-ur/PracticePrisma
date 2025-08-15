const generateAccessToken = require("../PaypalControllers/authController");
const axios = require("axios");

const paypalPlan = async (productId, planInformation) => {
  try {
    const auth = await generateAccessToken();

    const {
      name,
      description,
      trial,
      fee_value,
      failure_threshold,
      fee_failure_action,
      regular,
    } = planInformation;

    if (!productId) return { status: "error", message: "ProductId required." };
    if (auth) {
      const response = await axios({
        url: process.env.PAYPAL_BASE_URL + "/v1/billing/plans",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        data: {
          product_id: `${productId}`,
          name: "Practice Testing Plan" | name,
          description: "Plan to practice auto billing" | description,
          status: "ACTIVE", //Needed to make suscription
          billing_cycles: trial
            ? [
                trial.amount == 1
                  ? {
                      frequency: {
                        interval_unit: trial.frequency,
                        interval_count: trial.frequency_count,
                      },
                      tenure_type: "TRIAL",
                      sequence: trial.sequence,
                      total_cycles: trial.cycles,
                      pricing_scheme: {
                        fixed_price: {
                          value: trial.value,
                          currency_code: "USD",
                        },
                      },
                    }
                  : {
                      frequency: {
                        interval_unit: trial.frequency,
                        interval_count: trial.frequency_count,
                      },
                      tenure_type: "TRIAL",
                      sequence: trial.sequence,
                      total_cycles: trial.cycles,
                      pricing_scheme: {
                        fixed_price: {
                          value: trial.value,
                          currency_code: "USD",
                        },
                      },
                    },
                {
                  frequency: {
                    interval_unit: trial.frequency2,
                    interval_count: trial.frequency_count2,
                  },
                  tenure_type: "TRIAL",
                  sequence: trial.sequence2,
                  total_cycles: trial.cycles2,
                  pricing_scheme: {
                    fixed_price: {
                      value: trial.value2,
                      currency_code: "USD",
                    },
                  },
                },
                {
                  frequency: {
                    interval_unit: regular.interval_unit,
                    interval_count: regular.interval_count,
                  },
                  tenure_type: "REGULAR",
                  sequence: regular.sequence,
                  total_cycles: regular.cycles,
                  pricing_scheme: {
                    fixed_price: {
                      //Leave like this by the moment.
                      value: regular.value,
                      currency_code: "USD",
                    },
                  },
                },
              ]
            : [
                {
                  frequency: {
                    interval_unit: regular.interval_unit,
                    interval_count: regular.interval_count,
                  },
                  tenure_type: "REGULAR",
                  sequence: regular.sequence,
                  total_cycles: regular.cycles,
                  pricing_scheme: {
                    fixed_price: {
                      //Leave like this by the moment.
                      value: regular.value,
                      currency_code: "USD",
                    },
                  },
                },
              ],
          payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
              value: fee_value,
              currency_code: "USD",
            },
            setup_fee_failure_action: fee_failure_action,
            payment_failure_threshold: failure_threshold,
          },
        },
      });

      return response
        ? {
            status: "success",
            message: "Suscription plan created",
            planId: response.data.id,
          }
        : {
            status: "error",
            message: "We couldn't find the response, try again later.",
          };
    } else
      return {
        status: "error",
        message: "We coldn't receive the access token, try again later.",
      };
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.message);
  }
};

module.exports = paypalPlan;
