const Provider = require('../database/models/provider')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
const { sendConfirmationEmail } = require('../sendgrid');


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
      const { username, email, password, imgprof, patente, mobile, category, adresse } = req.body;
  
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

      if (provider && isPasswordValid && !provider.is_approved) {
return res.send({
  message: "verifier votre boite email"
})
      }

      const token = jwt.sign({ providerId: provider.id, role: provider.role }, 'your_secret_key');
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); 
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  };

  const verifyProvider = (req,res)=>{
    Provider.findOne({ where: { activationCode: req.params.activationcode } })
    .then(provider=>{
      if(!provider){
        res.send({
          message:"ce code d'activation est faut"
        })
      }
      provider.is_approved = true
      provider.save()
      res.send({
        message: "le compte est active avec succes !"
      })
    })
  }

  module.exports = {
    getAllProvider,
    getOneProvider,
    signupProvider,
    loginProvider,
    verifyProvider
  }