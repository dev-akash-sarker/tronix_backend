require('dotenv').config();
const express = require('express')
const _ = require('./routes/index');
const mongoConfig = require('./config/mongoConfig');
const app = express()
const port = 8000
// database
app.use(mongoConfig)
app.use(_);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
