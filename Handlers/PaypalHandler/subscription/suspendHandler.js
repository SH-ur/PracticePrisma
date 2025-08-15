const suspend = require("../../../Controllers/PaypalControllers/subscription/suspendPaypalSubscription");

const suspendHandler = async(req, res)=>{
    try {
        const {subscriptionId, reason} = req.body;

        const answer = await suspend(subscriptionId, reason);

        return answer.status== "success"? res.status(200).json(answer): res.status(400).json(answer);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message);
    }
}

module.exports= suspendHandler;