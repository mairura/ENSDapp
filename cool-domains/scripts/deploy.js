const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("com");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("avengers", {value: hre.ethers.utils.parseEther("0.0001")});
    await txn.wait();
    console.log("Minted domain avengers.com");

    txn = await domainContract.setRecord("avengers", "I am a guru for the avengers");
    await txn.wait();
    console.log("Set record for avengers.com");

    const address = await domainContract.getAddress("avengers");
    console.log("Owner of domain avengers:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

};

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

runMain();

//Contract Address
// 0x2DD59997DF4a3bBBF682Ca8d5108f814EE906208