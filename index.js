require('dotenv').config()
const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')
app.use(
    fileUpload({
        extended:true
    })
)

app.use(express.static(__dirname))
app.use(express.json())
const path = require('path')
const ethers = require('ethers')

var PORT = 3000

const RPC_URL = process.env.API_URL
const PRIV_KEY = process.env.PRIV_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

 