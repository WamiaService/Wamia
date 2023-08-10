const { default: axios } = require("axios")
module.exports = {
Add : (req,res)=>{
    const url = "https://developers.flouci.com/api/generate_payment"
    const payload  = {
    
        "app_token": "83ce7365-20cb-4391-bd35-c80f70ff977c", 
        "app_secret": process.env.FLOUCI_SECRET,
        "amount": "555",
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:3001/success",
        "fail_link": "http://localhost:3001/fail",
        "developer_tracking_id": "4e7f5f00-9621-4dce-83c0-82f23682912c"
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
        'apppublic': '83ce7365-20cb-4391-bd35-c80f70ff977c',
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