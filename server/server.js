const express = require('express');
const cors = require("cors")
const cookieParser = require("cookie-parser")
const sequelize = require("./database/db")
const servicesRoutes= require('./routes/services.routes')


const Adminrouter = require("./routes/admin.routes")
const payementRouter= require('./routes/payment.routes')
require("dotenv").config()

PORT  = 3000 ; 


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//!services
app.use('/service', servicesRoutes)
const providerRoute = require('./routes/provider.routes')
app.use('/provider',providerRoute)
const custumorRoute = require('./routes/custumor.routes')
app.use('/custumor',custumorRoute)
app.use("/api/admin", Adminrouter);
app.use("/api/payement",payementRouter)
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