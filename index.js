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

const RPC_URL = process.env.RPC_URL
const PRIV_KEY = process.env.PRIV_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json')
const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

const signer = new ethers.Wallet(PRIV_KEY,provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS,abi,signer)

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))

})

app.get("/index.html", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
    
})

app.post("/addCandidate", async(req,res)=>{
    var vote = req.body.vote;
    async function storeDataInBlockchain(vote){
        console.log("Adding the candidate......")
        const tx = await contract.addCandidate(vote)
        await tx.wait()
    }

    const statusVoting = await contract.getStatusVoting()
    if (statusVoting){
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract")
    } else {
        res.send("Voting is finished")
    }
})

app.listen(PORT, function(){
    console.log("App is running on the port" , PORT)
})