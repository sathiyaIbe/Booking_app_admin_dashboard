import userDb from "../Models/user.model.js"
const userRegister = async (req, res) => {
    try {
        var userName = req.body.username
        if (userName.length > 2) {
            var val = req.body.username.substring(0, 3)
        } else {
            var val = userName
        }
        var checkId = true
        function checkVal(val) {
            let id = val
            for (let i = 0; i < 5; i++) {
                id += (Math.floor(Math.random() * 9));
                if (id.length === 7) {
                    return id
                }
                else if (id.length > 7) {
                    id = val + '-'
                }
            }
        }
        var userId = ''
        var tempId = (checkVal(val))
        while (checkId) {
            var checksId = await userDb.findOne({ userId: tempId })
            if (checksId === null) {
                checkId = false
                userId = tempId
            } else {
                tempId = (checkVal(val))
            }
        }
        const data = { ...req.body, userId }
        var userData = await new userDb(data).save()
        res.status(200).json(userData)
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}
const importUsers = async (req, res) => {
    const data = (req.body)
    console.log(data)
    try {
        const importData = await userDb.insertMany(data)
        console.log(importData)
        res.status(200).json(importData)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Internal Error" })
    }
}
const getUserDetails = async (req, res) => {
    try {
        var data = await userDb.find()
        res.status(200).json(data)
    } catch (err) {
        return res.status(400).json({ error: 'Internal Error' })
    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        var deleteUser = await userDb.deleteOne({ _id: id });
        res.status(200).json({ message: 'Deleted' })
    } catch (err) {
        res.status(400).json({ message: "Internal Error" })
    }
}
const deleteMultipleUser = async (req, res) => {
    try {
        var deleteManyUser = await userDb.deleteMany({ _id: { $in: req.body } })
        res.status(200).json({ message: "Deleted" })
    }
    catch (err) {
        res.status(400).json({ message: "Internal Error" })
    }
}
const updateUser = async (req, res) => {
    try {
        const _id = req.body._id
        const updateUser = await userDb.updateOne({ _id }, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                status: req.body.status
            }
        })
        if (updateUser.acknowledged) {
            const data = await userDb.findById({ _id })
            console.log(data)
            res.status(200).json(data)
        }
    }
    catch {
        res.status(400).json({ message: "Internal Error" })
    }
}
const countUser = async (req, res) => {
    try {
        var count = await userDb.count()
        var activeCount = await userDb.find({ status: 'active' }).count()
        var inactiveCount = count - activeCount
        const data = { count, activeCount, inactiveCount }
        res.status(200).json(data)
    } catch (err) {
        return res.status(400).json({ error: 'Internal Error' })
    }
}
const Controller = { userRegister, getUserDetails, deleteUser, deleteMultipleUser, updateUser, countUser, importUsers }
export default Controller