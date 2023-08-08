
const axios = require("axios")
module.exports = {
    Add:   (req,res)=>{
        const url = "https://developers.flouci.com/api/generate_payment"
        const payload = {
            
            "app_token": "8002d4d5-b457-4d01-ad68-6c7c3fd3d367", 
            "app_secret": "199740dc-76b6-40c2-b8df-42a0b9f9ad1a",
            "amount": "5000",
            "accept_card": "true",
            "session_timeout_secs": 1200,
            "success_link": "http://localhost:30001/success",
            "fail_link": "http://localhost:3001/fail",
            "developer_tracking_id": "81072531-7fb5-48ef-8d9e-3a684bb0e674"
        }
     
          axios
          .post(url,payload)
          .then(result=>{res.send(result.data)}
          )
          .catch((error)=>{console.log(error)})
      },
 }
 Verify:(req,res)=>{
    const payment_id=req.params.id;
     axios.get(`https://developers.flouci.com/api/verify_payment/${payment_id}`,
    {
        headers : {
            'Content-Type': 'application/json',
            'apppublic': "8002d4d5-b457-4d01-ad68-6c7c3fd3d367",
            'appsecret': process.env.FLOUCI_SECRET
          }
    }).then((result)=>{res.send(result.data)})
    .catch((error)=>{console.log(error)})
}
