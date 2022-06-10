require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
const fs = require('fs');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

task("verifycontract", "This task is for verifying deployed contract.")
	.setAction(async (taskArgs, hre) => {
		if (fs.existsSync('./deployedAddress.json')) {
			console.log("file exists");
			const content = fs.readFileSync('./deployedAddress.json', 'utf8');
			const address = JSON.parse(content).address;
			await hre.run('verify:verify', {
				address: address,
				constructorArguments: [
					[
						"0xaf6Da626590162e4cCcfc274304d238f0597fF7e",
						"0x0A0c2601C7874E77a401D91f8085DD07b040E595",
						"0x724f337bF0Fa934dB9aa3ec6dEa49B03c54AD3cc"
					]
				]
			});
		} else {
			console.log("Address file doesn't exist! Please deploy contract first!");
		}
	})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
	networks: {
		hardhat: {
			chainId: 31337
		},
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`]
		},
		goerli: {
			url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`]
		},
		rinkeby: {
			url: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`]
		}
	},
	etherscan: {
		apiKey: {
			ropsten: process.env.API_KEY,
			goerli: process.env.API_KEY,
			rinkeby: process.env.API_KEY
		}
	}
};
