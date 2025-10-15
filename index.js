require('dotenv').config()
const express = require('express')
const _ = require('./routes')
const cors = require('cors')
const mongoConfig = require('./config/mongoConfig')
const app = express()
const port = process.env.PORT

app.use(cors({
  origin: "http://localhost:3000", // your Next.js frontend
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
mongoConfig()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(_)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})