const {ethers} =require('hardhat')

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log("deploy from address", deployer.address);

    const  Voting = await ethers.getContractFactory("Voting")
    const voting = await Voting.deploy([],100)
    console.log("Voting address", voting.address)
}

main().then(()=> process.exit(0))
.catch(err=>{
    console.log(err)
    process.exit(1)
})