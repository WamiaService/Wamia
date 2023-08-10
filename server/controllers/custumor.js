const Custumor = require('../database/models/custumor')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
const { sendConfirmationEmail } = require('../sendgrid');


//Get All custumor
const getAllcustumor = async (req, res) => {
    try {
      const custumors = await Custumor.findAll();
      res.status(200).json(custumors);
    } catch (error) {
      console.error('Get custumors Error:', error);
      res.status(500).json({ error: 'Failed to retrieve custumors' });
    }
  };

  // Get One custumor

  const getOnecustumor = async (req, res) => {
    try {
      const { custumorId } = req.params;
      const custumor = await Custumor.findOne({ where: { id: custumorId } });
      if (!custumor) {
        return res.status(404).json({ error: 'custumor not found' });
      }
      res.status(200).json(custumor);
    } catch (error) {
      console.error('Get custumor Error:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };

  // register custumor

const signupcustumor = async (req, res) => {

  const characters =
  "0123";
let activationCode = "";
for (let i = 0; i < 5; i++) {
  activationCode += characters[Math.floor(Math.random() * characters.length)];
}
  try {
    const { username, email, password,imgprof,identity,role,adresse } = req.body;

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
    const custumor = await Custumor.create({
      username,
      email,
      password: hashedPassword,
      imgprof,
      role,
      identity,
      activationCode:activationCode,
      adresse
    });
    await sendConfirmationEmail(email,activationCode)
    res.status(200).json({ message: 'Register successful', custumor });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Register failed' });
  }
};

const logincustumor = async (req, res) => {
    try {
      const { username, password } = req.body;
      const custumor = await Custumor.findOne({ where: { username } });
      if (!custumor) {
        return res.status(404).json({ error: 'custumor not found' });
      }
      
      const isPasswordValid = await bcrypt.compare(password, custumor.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
     
      const token = jwt.sign({ custumorId: custumor.id }, 'your_secret_key');
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set token as a cookie
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  };

  module.exports = {
    getAllcustumor,
    getOnecustumor,
    signupcustumor,
    logincustumor
  }