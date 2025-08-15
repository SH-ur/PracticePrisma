const activate = require("../../../Controllers/PaypalControllers/subscription/activatePaypalSubscription");

const activateHandler = async(req, res)=>{
    try {
        const {subscriptionId, reason} = req.body;

        const answer = await activate(subscriptionId, reason);

        return answer.status== "success"? res.status(200).json(answer): res.status(400).json(answer);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports= activateHandler;