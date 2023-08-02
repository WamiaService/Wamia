const Rating =require('../database/models/rating')
const Comment= require('../database/models/comment')


const rateInfo={
    submitRating: async(req,res)=>{
        try{
            const {idProvider}=req.params
            const {rate, review}=req.body
            if(rate<1 || rate>5){
                return res.status(400).json({message:"invalid rating value"})
            }
            const newRating= await Rating.create({
              rate,
              review,
              ProviderId: idProvider,
              CustomerId: customerId
            })
            res.status(201).json(newRating)
        }
        catch (error) {
            console.error('Error saving rating:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
    }

}

module.exports= rateInfo
