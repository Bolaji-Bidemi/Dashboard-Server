import OverAllStat from "../models/OverAllStat.js"


export const getOverview = async (req, res) => {
    try{
        const overviewStat = await OverAllStat.find()

        res.status(200).json(overviewStat[0])


    }catch(err){
        res.status(404).json({message: err.message})
    }
}