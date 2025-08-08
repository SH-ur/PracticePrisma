require("./authController");
const axios = require("axios");
const createOrder = async()=>{
    try {
const accessToken = await generateAccessToken();

const res= await axios({
    url: process.env.PAYPAL_BASE_URL + "v2/checkout/orders",
    method: 'post',
    headers: {'Content-Type': 'application/json', 'Authorization':'Bearer '+ accessToken},
    data: JSON.stringify({
        intent: 'CAPTURE', purchase_units: [
            items: [
            {name: "Objeto Ejemplo1", description: "Objeto de práctica Paypal 1", quantity: 1, unit_amount: {
                currency_code: "USD", value: "100.00"
            }}
            ]
        ]
    })
})
    } catch (error: any){

    }
}