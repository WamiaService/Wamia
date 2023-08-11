const {sequelize,db}=require('../database/db')
const Services=require('../database/models/services')
const Provider= require('../database/models/provider')

const serviceInfo={

    getAll: async (req, res) => {
        try {
          const services= await Services.findAll()
          res.json(services);
        } catch (err) {
          res.status(500).json({ error: "Internal server error" });
        }
      },

     //! get one provider posts
  getAllProvider: async (req, res) => {
    const {providerId}=req.params
    
    try {
      const posts = await Services.findAll({where:{providerId},
      include:[Provider]})
      
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },  


  //!delete Service
  deleteService: async (req, res) => {
    const { id } = req.params;
    try {
      await Services.destroy({ where: {id: id } });
      res.json({ message: "service deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },


  //!post Service
  postService: async (req, res) => {
    const { 
      name, 
      img,
      desc 
    } = req.body; 

    const {providerId}=req.params

    try {
      const service = await Services.create({
        name:name,
      img:img,
      desc:desc,
      providerId:providerId
      });

      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },


  //!update Service
  updateService: async (req, res) => {
    const { id } = req.params;
    let {name,
        image,
       desc
    } = req.body;

    try {
      const service = await Services.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: "service not found" });
      }
        service.name=name;
        service.img=image;
        service.desc=desc;
      
      await service.save();
      res.json(service);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

}
module.exports = serviceInfo