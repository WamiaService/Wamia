const { default: axios } = require("axios")
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
module.exports = {
Add : async (req,res)=>{
   try{
    const {name}=req.body
    if(!name) res.status(400).json({message:'Please enter a name'})
    const paymentIntent = await stripe.paymentIntents.create({
amount : req.body.amount,
currency:'eur',
payment_method_types:("card"),
metadata:{name}

})
const clientSecret = paymentIntent.client_secret;
res.json({message: 'payment initiated',clientSecret})
   }catch (err){
    console.error(err)
    res.status(500).json({message:'Internal server error'})
   } 
}
}