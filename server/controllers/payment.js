const { default: axios } = require("axios")
module.exports = {
Add : (req,res)=>{
    const url = "https://developers.flouci.com/api/generate_payment"
    const payload  = {
    
        "app_token": "8002d4d5-b457-4d01-ad68-6c7c3fd3d367", 
        "app_secret": process.env.FLOUCI_SECRET,
        "amount": "555",
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:3001/success",
        "fail_link": "http://localhost:3001/fail",
        "developer_tracking_id": "81072531-7fb5-48ef-8d9e-3a684bb0e674"
    }
    axios
    .post(url,payload)
    .then(result =>{
        res.send(result.data)
    })
    .catch((err=> console.log(err)))
},
///verification
Verify : async (req,res)=>{
   const id_payment = req.params.id
await axios.get(`https://developers.flouci.com/api/verify_payment/${id_payment}`,{
    headers :{
        'Content-Type': 'application/json',
        'apppublic': '7431ff30-ef7e-4f6a-b2f3-b5fc04d8ecbe',
      'appsecret': process.env.FLOUCI_SECRET
    }
}

    )
.then(result=>{
    res.send(result.data)
})
.catch(err=>{
    console.log(err);
})
}
}