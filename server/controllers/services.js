const {sequelize,db}=require('../database/db')
const Services=require('../database/models/services')

const serviceInfo={

    getAll: async (req, res) => {
        try {
          const services=Services.findAll()
          res.json(services);
        } catch (err) {
          res.status(500).json({ error: "Internal server error" });
        }
      },

     //! get one provider posts
  getAllProvider: async (req, res) => {
    const ProviderId=req.params.idProvider
    console.log("seller id ",ProviderId);
    try {
      const cars = await Services.findAll({where:{ProviderId}})
      console.log(cars)
      res.json(cars);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },  
  //!delete Service
  deleteService: async (req, res) => {
    const { idservices } = req.params;
    try {
      await Services.destroy({ where: {id: idservices } });
      res.json({ message: "service deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //!post Service
  postService: async (req, res) => {
    const {  
      img,
      
    } = req.body; 

    try {
      const service = await Services.create({
      img,  
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
        img,
       desc
    } = req.body;

    try {
      const service = await Services.findByPk(id);
      if (!service) {
        return res.status(404).json({ error: "service not found" });
      }
        service.name=name;
        service.img=img;
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