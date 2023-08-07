
const axios = require("axios")
module.exports = {
    Add:  async (req,res)=>{
        const url = "https://developers.flouci.com/api/generate_payment"
        const payload = {
            "app_token": "8002d4d5-b457-4d01-ad68-6c7c3fd3d367", 
            "app_secret": process.env.FLOUCI_SECRET,
            "amount": req.body.amount,
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "success_link": "http://localhost:3001/success",
            "fail_link": "http://localhost:3001/fail",
            "developer_tracking_id": "81072531-7fb5-48ef-8d9e-3a684bb0e674"
        }
     await axios
     .post(url,payload)
     .then(result=>{
        res.send(result.data)
     
     })
     .catch(err=>console.error(err))
    }
 }