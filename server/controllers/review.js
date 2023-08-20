const Review =require("../database/models/review")




 //create Review

const createReview=async(req,res)=>{
    const {providerId}=req.params
    const {review,custumorId} = req.body;
  
 if(review===''){
 
    return res.status(400).json({message:"invalid review value"})

 }
  try {
      const newReview = await Review.create({
        
        
        review:review,
        custumorId:custumorId,
        providerId:providerId
      
      });
      console.log("rae",newReview)
      res.status(201).json(newReview);
    } catch (error) {
      console.log("e",error)
      res.status(500).json('Error submitting rating');
     }
}




//getAll reviews for one provider
const getAllReview = async (req, res) => {
    try {
      const providerId = req.params.providerId; 
  
      const reviews = await Review.findAll({
        where: {
          providerId: providerId
        }
     
      });
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Get Provider Reviews Error:', error);
      res.status(500).json({ error: 'Failed to find reviews for the provider' });
    }
  };




module.exports={
    createReview,
    getAllReview
  

}