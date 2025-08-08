const axios = require("axios")

const generateAccessToken = async()=>{
    try {
        const response = await axios({
            url: process.env.PAYAPL_BASE_URL + "v1/oauth/token",
            method: "post",
            data: "grant-type = client-credentials",
            auth:{
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            }
        })
        console.log(response?.data)
        return response?.data?.access_token ? response.data.access_token: null;

    }catch(error: any){
        throw new Error(error?.message);
    }
};

module.exports= generateAccessToken;