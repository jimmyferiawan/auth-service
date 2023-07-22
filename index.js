const express = require('express')
const Moment = require('moment')
const app = express()
const authRouter = require('./routes/auth.router')

const PORT = process.env.APP_PORT || 9003

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use((req, res, next) => {
    console.log('Time : ', Moment().format("DD-MM-yyyy hh:mm:ss"))
    console.log('Request type : ', req.method)
    console.log('Request URL : ', req.originalUrl)
    console.log('Request Body : ', req.body)
    console.log('Request Query : ', req.query)
    next()
})

app.use('/', authRouter)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`app listening at http://0.0.0.0:${PORT}`)
})