const comment= require('../database/models/comment')


const comments={
    submitComment: async (req, res) => {
        try {
          const { idProvider } = req.params;
          const { text } = req.body;
    
          const newComment = await Comment.create({
            text,
            ProviderId: idProvider, 
            CustomerId: customerId, 
          });
    
          res.status(201).json(newComment);
        } catch (error) {
          console.error('Error saving comment:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}

module.exports = comments