const { default: axios } = require("axios")
module.exports = {
Add : (req,res)=>{
    const url = "https://developers.flouci.com/api/generate_payment"
    const payload  = {
    
        "app_token": "bdc62ffb-5b76-4944-8548-f658bcaa2277", 
        "app_secret": process.env.FLOUCI_SECRET,
        "amount": "555",
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://192.168.104.5:3000/success",
        "fail_link": "http://192.168.104.5:3000/fail",
        "developer_tracking_id": "8b97eb70-8666-4832-8e73-491006ea92a1"
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
        'apppublic': 'bdc62ffb-5b76-4944-8548-f658bcaa2277',
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