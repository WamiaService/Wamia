const Provider = require('../database/models/provider')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
const { sendConfirmationEmail } = require('../sendgrid');
const { Op } = require('sequelize');



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

    const characters =
    "0123456789abcdefghijklmnopqrstuvwxyz";
  let activationCode = "";
  for (let i = 0; i < 25; i++) {
    activationCode += characters[Math.floor(Math.random() * characters.length)];
  }

    try {
      const { username, email, password, imgprof, patente, mobile,role, category, adresse } = req.body;
  
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      // Validate password complexity (at least one letter and one number)
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one letter and one number, and be at least 6 characters long' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const provider = await Provider.create({
        username,
        email,
        password: hashedPassword,
        imgprof,
        patente,
        mobile,
        role,
        category,
        activationCode:activationCode,
        adresse
      });
      // sendConfirmationEmail(email,activationCode)
      await sendConfirmationEmail(email,activationCode)
      res.status(200).json({ message: 'Register successful', provider });
    } catch (error) {
      console.error('Register Error:', error);
      res.status(500).json({ error: 'Register failed' });
    }


  };
  

const loginProvider = async (req, res) => {
    try {
      const { username, password } = req.body;
      const provider = await Provider.findOne({ where: { username } });
      if (!provider) {
        return res.status(404).json({ error: 'provider not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, provider.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

     

      const token = jwt.sign({ providerId: provider.id }, 'your_secret_key');
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  };

  const verifyProvider = async (req, res) => {
    try {
      const provider = await Provider.findOne({ where: { activationCode: req.params.activationcode } });
      if (!provider) {
        return res.status(404).json({ message: "Invalid activation code" });
      }
  
      provider.is_approved = true;
      await provider.save();
  
      res.status(200).json({ message: "Your account has been successfully verified!" });
    } catch (error) {
      console.error('Verification Error:', error);
      res.status(500).json({ error: 'Verification failed' });
    }
  };
  
  const searchProviders = async (req, res) => {
    try {
      let whereClause = {};
  
      if (req.query.username) {
        whereClause.username = {
          [Op.like]: '%' + req.query.username + '%'
        };
      }
  
      if (req.query.email) {
        whereClause.email = {
          [Op.like]: '%' + req.query.email + '%'
        };
      }
  
      if (req.query.category) {
        whereClause.category = {
          [Op.substring]: '%' + req.query.category + '%'
        };
      }
  
      const providers = await Provider.findAll({
        where: whereClause
      });
  
      res.status(200).json(providers);
    } catch (error) {
      console.error('Search Providers Error:', error);
      res.status(500).json({ error: 'Failed to retrieve providers based on the search criteria' });
    }
  };


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
      const hashedPassword = await bcrypt.hash(password, 10);
      const providerProfile= await Provider.findByPk(id)
      if (!providerProfile) {
        return res.status(404).json({ error: "User profile not found" });
      } 
   
      providerProfile.username=username;
      providerProfile.email=email;
      providerProfile.password=hashedPassword;
      providerProfile.mobile=mobile;
      providerProfile.imgprof=imgprof
  
  
    await providerProfile.save();
    res.json(providerProfile);
      
    }
    catch(error){
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  
  module.exports = {
    getAllProvider,
    getOneProvider,
    signupProvider,
    loginProvider,
    verifyProvider,
    searchProviders,
    updateProvider
  }