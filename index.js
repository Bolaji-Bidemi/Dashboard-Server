import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoute from './routes/clientRoute.js'
import generalRoute from './routes/generalRoute.js'
import managementRoute from './routes/managementRoute.js'
import salesRoute from './routes/salesRoute.js'
import Transaction from './models/Transaction.js'
import OverAllStat from './models/OverAllStat.js'

// data import
// import Users from './models/User.js'
// import { dataUser } from './data/index.js'
//import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import {dataProduct, dataProductStat, dataTransaction, dataOverallStat} from './data/index.js'


// Configurations
dotenv.config()
const PORT = process.env.PORT || 5001
const app = express()

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//mongodb connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    
    // app.listen(PORT, ()=> {
    //     console.log(`Database Connected Successfully`)
    // })
    console.log(`Database Connected Successfully`)

    /* Adding the dataUsers from the data folder into the database */
   // Users.insertMany(dataUser)
   //Product.insertMany(dataProduct)
   //ProductStat.insertMany(dataProductStat)
   // Transaction.insertMany(dataTransaction)
    // OverAllStat.insertMany(dataOverallStat)
}).catch(err=>{
    console.log('Error', err)
})





//Routes
app.use('/clients', clientRoute)
app.use('/general', generalRoute)
app.use('/management', managementRoute)
app.use('/sale', salesRoute)

app.listen(PORT, ()=> {
    console.log(`Server serving at ${PORT}`)
})