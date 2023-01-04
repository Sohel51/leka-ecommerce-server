const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000
const bodyParser = require('body-parser') //bodyParser
const cors = require('cors'); //installing cors
const formData = require('express-form-data'); //installing formData

const userRouter = require('./routers/user-router'); //Link the router
const productRouter = require('./routers/product-router'); //Another router

app.set('json spaces', 4)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) //using bodyparser for view the data
app.use(formData.parse()); //using parse
app.use(cors()); //using cors

app.use('/user', userRouter); //connect the router

mongoose.set('strictQuery', true);
mongoose
  .connect('mongodb+srv://leka-ecom:pNrHJto3XB7b4lsm@leka-ecommerce.gh6j6dw.mongodb.net/leka_ecommerce?retryWrites=true&w=majority')
  .then(() => {
    console.log('mongoose connected');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`) //default port for backend
    })
  })
  .catch((err) => {
    console.log(err);
  })
