import express from 'express'
const app = express();
import dotenv from "dotenv";
dotenv.config();
import { createProxyMiddleware } from 'http-proxy-middleware'
app.get(('/'), (req, res) => {
    res.send('Middlware Created')
})
// services
app.use('/api', createProxyMiddleware({ target: process.env.Login, changeOrigin: true }))
app.use('/user', createProxyMiddleware({ target: process.env.User, changeOrigin: true }))
app.use('/cab', createProxyMiddleware({ target: process.env.CabService, changeOrigin: true }))
app.use('/admin', createProxyMiddleware({ target: process.env.Admin, changeOrigin: true }))
app.listen(5000, () => {
    console.log('http://localhost:5000/')
})
