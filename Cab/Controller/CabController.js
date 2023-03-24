import cabDb from "../Models/cab.model.js"
const cabRegister = async (req, res) => {
    const details = {
        DriverName: req.body.name,
        CabId: req.body.cabId,
        From: req.body.from,
        To: req.body.to,
        Status: req.body.status
    }
    try {
        var cabDetails = await new cabDb(details).save()
        console.log(cabDetails)
        res.status(200).json(cabDetails)
    } catch (err) {
        return res.status(400).json({ error: 'Internal Error' })
    }
}
const getCabDetails = async (req, res) => {
    try {
        var data = await cabDb.find()
        res.status(200).json(data)
    } catch (err) {
        return res.status(400).json({ error: 'internal Error' })
    }
}
const Controller = { cabRegister, getCabDetails }
export default Controller