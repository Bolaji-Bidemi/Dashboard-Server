import Product from "../models/Product.js"
import User from "../models/User.js"
import ProductStat from "../models/ProductStat.js"
import Transaction from "../models/Transaction.js"
import getCountryIso3 from 'country-iso-2-to-3'


export const getProducts = async(req, res) => {
    try{
        const products = await Product.find()
        
        const productsWithStat = 
        await Promise.all(
            products.map(async(product)=>{
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc,
                    stat
                }
            })
       )
        res.status(200).json(productsWithStat)

    }catch(err){
        res.status(404).json({message: err.message})
    }
}


export const getCustomers = async(req, res) => {
    try{
        const users = await User.find({role: "user"}).select("-password")
        res.status(200).json(users)

    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getTransactions = async(req, res) => {
    try{
        const {page = 1, pageSize = 20, sort= null, search = ""} = req.query
       const generateSort = () =>{
        const sortParsed = JSON.parse(sort)
        const sortedFormat = {
            [sortParsed.field] : sortParsed.sort === "asc" ? 1 : -1
        }
        return sortedFormat
       }
       
       const sortedFormat = Boolean(sort) ? generateSort() : {}

       const transaction = await Transaction.find({
              $or: [
                {cost: {$regex: new RegExp(search, "i")}},
                {userId: {$regex: new RegExp(search, "i")}}
            ]
       })
         .sort(sortedFormat)
            .limit(pageSize)
            .skip(page * pageSize)

        const total = await Transaction.countDocuments({
            cost: { $regex: search, $options : 'i' }
        })

        res.status(200).json({
            transaction,
            total
        })

    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getGeography = async(req, res) => {
    try{
        const users = await User.find()
        const mappedLocation = users.reduce((acc, {country})=>{
            const countryIso3 = getCountryIso3(country)
            if(!acc[countryIso3]){
                acc[countryIso3] = 0
            }
            acc[countryIso3] = acc[countryIso3] + 1
            return acc
        }, {})

        const formattedLocation = Object.entries(mappedLocation).map(([country, count])=>{
            return {
                id: country,
                value: count
            }
        })
        
        res.status(200).json(formattedLocation)

    }catch(err){
        res.status(404).json({message: err.message})
    }
}