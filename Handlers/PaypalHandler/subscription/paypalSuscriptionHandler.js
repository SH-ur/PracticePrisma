const paypalSuscription = require("../../../Controllers/PaypalControllers/subscription/paypalSuscription");

const paypalSuscriptionHandler = async(req, res)=>{
    try {
        const {planId, subsInfo} = req.body;
console.log(req.body);
        const answer = await paypalSuscription(planId, subsInfo);

        return answer.status == "success" ? res.status(200).json(answer): res.status(400).json(answer);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = paypalSuscriptionHandler;