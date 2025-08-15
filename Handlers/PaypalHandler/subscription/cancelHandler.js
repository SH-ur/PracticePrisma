const cancel = require("../../../Controllers/PaypalControllers/subscription/cancelPaypalSubscription");

const cancelHandler = async(req, res)=>{
    try {
        const {subscriptionId, reason} = req.body;

        const answer = await cancel(subscriptionId, reason);

        return answer.status== "success"? res.status(200).json(answer): res.status(400).json(answer);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports= cancelHandler;