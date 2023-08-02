const Provider = require('../database/models/provider')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')




    //! update Provider
   const updateProvider = async(req,res)=>{
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
      };

    





//Get All Provider
const getAllProvider = async (req, res) => {
    try {
      const providers = await Provider.findAll();
      res.status(200).json(providers);
    } catch (error) {
      console.error('Get providers Error:', error);
      res.status(500).json({ error: 'Failed to retrieve providers' });
    }
  };

  // Get One Provider

  const getOneProvider = async (req, res) => {
    try {
      const { providerId } = req.params;
      const provider = await Provider.findOne({ where: { id: providerId } });
      if (!provider) {
        return res.status(404).json({ error: 'provider not found' });
      }
      res.status(200).json(provider);
    } catch (error) {
      console.error('Get provider Error:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };

  // register Provider

const signupProvider = async (req, res) => {
  try {
    const { username, email, password,imgprof,patente,mobile,category,adresse } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const provider = await Provider.create({
      username,
      email,
      password: hashedPassword,
      imgprof,
      patente,
      mobile,
      category,
      adresse
    });
    res.status(200).json({ message: 'Register successful', provider });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Register failed' });
  }
};

const loginProvider = async (req, res) => {
    try {
      const { email, password } = req.body;
      const provider = await Provider.findOne({ where: { email } });
      if (!provider) {
        return res.status(404).json({ error: 'provider not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, provider.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ providerId: provider.id, role: provider.role }, 'your_secret_key');
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set token as a cookie
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  };

  module.exports = {
    getAllProvider,
    getOneProvider,
    signupProvider,
    loginProvider,
    updateProvider
  }
