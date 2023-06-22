import express from 'express'
import User from '../models/User.js'
import Transaction from '../models/Transaction.js'
import OverAllStat from '../models/OverAllStat.js'

export const getUser = async(req, res) =>{
   try{
    const {id } = req.params 

    const user = await User.findById(id)

   return res.status(200).json(user)


   }catch(err){
     res.status(404).json({
        Error: err.message
    })
   }
}

export const getDashboardStat = async(req, res) =>{
   try{
      //hardcodedd values
      const currentMonth = "November"
      const currentYear = 2021
      const currentDay = 2021-11-15

      //Recent transactions
      const transaction = await Transaction.find().limit(50).sort({createdAt: -1})

      //overview stat
      const overallStat = await OverAllStat.find({year: currentYear})

      const {
         totalCustomers,
         yearlyTotalSoldUnits,
         yearlyTotalSales,
         monthlyData,
         salesByCategory

      } = overallStat[0]

      const thisMonthStat = overallStat[0].monthlyData.find(({month}) => {
         return month === currentMonth
      })

      const todayStat = overallStat[0].dailyData.find(({date}) => {
         return date === currentDay
      })

      res.status(200).json({
         totalCustomers,
         yearlyTotalSoldUnits,
         yearlyTotalSales,
         monthlyData,
         salesByCategory,
         thisMonthStat,
         todayStat,
         transaction
      })

   }catch(err){
     res.status(404).json({
        Error: err.message
    })
   }
}