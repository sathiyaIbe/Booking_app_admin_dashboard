import jwt from 'jsonwebtoken'
import adminDetails from '../models/adminLogin.model.js'
const generateToken = async (user) => {
    try {
        const data = { _id: user.id }
        const token = jwt.sign(data, process.env.JWT_SECRET)
        console.log(token)
        return Promise.resolve({ token })
    } catch (error) {
        return Promise.reject(error)
    }
}
const login = async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await adminDetails['adminDb'].findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ message: "Mail miss match" })
        const { password } = req.body
        const checkPassword = password === user.password
        if (!checkPassword) return res.status(400).json({ message: 'Password miss match' })
        const { token } = await generateToken(user)
        if (user) {
            res.status(200).json({
                user: {
                    admidId: user._id,
                    email: user.email
                },
                token,
                message: 'Login Success'
            })
        }
    } catch (err) {
        console.log(err)
    }
}
var loginController = { login };
export default loginController;
