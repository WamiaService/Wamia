const Rating=require("../database/models/rating")


 //create a new rate



  // const createRate=async(req,res)=>{
  //     const {providerId}=req.params
  //     if(providerId){
  //   const { rate,custumorId} = req.body;
  //   if(rate<1 || rate>5){
  //     return res.status(400).json({message:"invalid rating value"})
  // }
  //   try {
  //       const newRate = await Rating.create({
          
  //         rate:rate,
  //         custumorId:custumorId,
  //         providerId:providerId
  //       });
  //       console.log("rae",newRate)
  //       res.status(201).json(newRate);
  //     } catch (error) {
  //       console.log("e",error)
  //       res.status(500).json('Error submitting rating');
  //      }

  //     }
  // }
//


const createRate=async(req,res)=>{
  const {providerId}=req.params
  if (!providerId) {
    return res.status(400).json({ message: "Invalid provider ID" });
  }
const { rate,review,custumorId} = req.body;
if(rate<1 || rate>5){
  return res.status(400).json({message:"invalid rating value"})
}
if(!rate|| !review){
try {
    const newRate = await Rating.create({
      
      rate:rate,
      review:review,
      custumorId:custumorId,
      providerId:providerId
    
    });
    console.log("rae",newRate)
    res.status(201).json(newRate);
  } catch (error) {
    console.log("e",error)
    res.status(500).json('Error submitting rating');
   }

  
}
}



//calcul of the rate 
const calculateAverage=async(req,res)=>{
  const{providerId}=req.params;

  try{
    const rate= await Rating.findAll({ where:{providerId}})
      console.log(rate)
    if(rate.length===0){
  
        return res.status(404).json({ error: "rate not found for this provider" })

    }
    const totalRate=rate.reduce((sum,rate)=>sum+rate.value,0)
    const avrRating=totalRate/rate.length;
    res.status(200).json({avrRating})
  }

  catch(error){

    res.status(500).json('Error')
    console.log(error)
  }

}




 











module.exports={
    createRate,
    calculateAverage,


}