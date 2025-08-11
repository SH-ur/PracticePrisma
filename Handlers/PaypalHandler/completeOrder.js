const paypalComplete = require("../../Controllers/paypalControllers/paypalComplete");;

const completeOrderHandler = async(req, res)=>{
    try {
        //Here you can put an interface or object comparison to protect the items data.
        const {orderId} = req.body;
        if(!orderId) return res.status(400).json({status: "error", message: "We need the body information to do this."});

        const answer = await paypalComplete(orderId);
        
        return answer?.status == "success" ? res.status(200).json(answer):res.status(400).json(answer)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports= completeOrderHandler;