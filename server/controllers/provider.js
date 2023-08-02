const Provider = require('../database/models/provider')


module.exports={
    //! update Provider
    updateProvider : async(req,res)=>{
        const { id } = req.params;
        let {
          username,
          email,
          password,
          mobile,  
          imgprof
        } = req.body;
          
        try{
          const providerProfile= await Provider.findByPk(id)
          if (!providerProfile) {
            return res.status(404).json({ error: "User profile not found" });
          } 
       
          providerProfile.username=username;
          providerProfile.email=email;
          providerProfile.password=password;
          providerProfile.mobile=mobile;
          providerProfile.imgprof=imgprof
      
      
        await providerProfile.save();
        res.json(providerProfile);
          
        }
        catch(error){
          console.log(error);
          res.status(500).json({ error: "Internal server error" });
        }
      },

    
}