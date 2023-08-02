const express = require('express');
const cors = require("cors")
const cookieParser = require("cookie-parser")
const sequelize = require("./database/db")
const providerRoutes= require('./routes/provider.routes')
const servicesRoutes= require('./routes/services.routes')
// const reservationRoutes = require('./routes/reservation.routes.js')
const ratingRoutes = require('./routes/rating.routes')
const commentRoutes = require('./routes/comment.routes')
require("dotenv").config()

PORT  = 3000 ; 


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//!provider
app.use('/provider', providerRoutes)
//!services
app.use('/service', servicesRoutes)
//!reservation
// app.use('/reservation', reservationRoutes)
//!rating
app.use('/rating', ratingRoutes)
//!comment
app.use('/comment',commentRoutes)



const providerRoute = require('./routes/provider.routes')
app.use('/provider',providerRoute)
const custumorRoute = require('./routes/custumor.routes')
app.use('/custumor',custumorRoute)

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Models are synchronized with the database.');
    app.listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });