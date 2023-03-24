import adminDbData from '../Models/dashboardModel.js'


const getAdminData=async(req,res)=>{
    try{
        var data=await adminDbData.find()
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(400).json({error: "Invalid Error message"})
    }
}


const countAdminDatas=async(req,res)=>{
    try{
        const Totalrevenue=await adminDbData.aggregate(
            [
                {
                    $group:
                    {
                        _id:null,
                        
                        Totalrevenue:{
                            $sum:"$revenue"
                        }
                    
                    }
                }
            ]
        );
        const TotalBooking=await adminDbData.aggregate(
            [
                {
                    $group:{
                        _id:null,
                        TotalBooking:{$sum:'$booking'}
                    }
                }
            ]
        )
        const TotalUser=await adminDbData.aggregate(
            [
                {
                    $group:{
                        _id:null,
                        TotalUser:{$sum:'$user'}
                    }
                }
            ]
        )
        const data={TotalBooking,TotalUser,Totalrevenue}
        res.status(200).json(data)
       
    }catch(err){
        console.log(err)
    }
    
}
const Controller={getAdminData,countAdminDatas}

export default Controller