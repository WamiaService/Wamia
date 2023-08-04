const Custumor = require('../database/models/custumor')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')


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
  try {
    const { username, email, password,imgprof,identity,adresse } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const custumor = await Custumor.create({
      username,
      email,
      password: hashedPassword,
      imgprof,
      identity,
      adresse
    });
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

// update custumorprofil 


const updateCustumor= async(req,res)=>{
  const { id } = req.params;
  let {
    username,
    adresse,
    imgprof,  
    mobile,
  } = req.body;
    
  console.log(req.body)
  try{
    const client= await Custumor.findByPk(id)
    if (!client) {
      return res.status(404).json({ error: "Custumor profile not found" });
    } 


    console.log(firstname , lastname )
    client.username=username;
    client.adresse=adresse;
    client.imgprof=imgprof;
    client.mobile =mobile


  await client.save();
  res.json(client);
    
  }
  catch(error){
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}









  module.exports = {
    getAllcustumor,
    getOnecustumor,
    signupcustumor,
    logincustumor,
    updateCustumor
  }