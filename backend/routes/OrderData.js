const express = require("express")
const Orders = require("../models/Orders")
const router = express.Router()

router.post('/orderdata', async(req, res)=>{
    let data= req.body.order_data
    await data.splice(0, 0, {Order_date: req.body.order_date})
    
    // if email not existing i db then create: else: InsertMany()
    let eId = await Orders.findOne({"email": req.body.email})
    if (eId === null){
        try {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success: true})
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else {
        try{
            await Orders.findOneAndUpdate({email : req.body.email},
                { $push: { order_data: data}}).then(()=>{
                    res.json({success: true})
                })
        } catch(error) {
            res.send ("Server Error", error.message)
        }
    }
})

router.post('/myorderdata', async( req, res)=>{
    try {
        let myData = await Orders.findOne({'email': req.body.email})
        res.json({ orderData: myData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
})

module.exports = router;