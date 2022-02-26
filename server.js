const express = require('express')
require ('dotenv').config

const PORT = process.env.PORT || 7000

const app = express()

app.use(express.json())

app.get('/api/test', (_, res) => {
    res.send({
        msg: "Hello !!!"
    })
})

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port ${PORT}`)
})