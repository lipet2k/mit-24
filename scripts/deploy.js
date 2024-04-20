import hre from "hardhat";

async function main() {
    const ballot = await hre.ethers.deployContract("Ballot");
    await ballot.waitForDeployment();

    console.log(
        `Ballot deployed to ${ballot.target}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})