//https://eth-sepolia.g.alchemy.com/v2/INgx07gs7PNxrVCmH2BqBj45Z6G24GVu
//0x535626F839E85E474eDf4915488E1da5BA9AE882


require('@nomiclabs/hardhat-waffle');


module.exports={
  solidity:"0.8.0",
  networks:{ 

    sepolia: {
      url:"https://eth-sepolia.g.alchemy.com/v2/INgx07gs7PNxrVCmH2BqBj45Z6G24GVu",
      accounts:['dc39280cfd731cd47f29032c71793595959c6c60cb70c63a1f8813ec8423d90d']
    }

  }
}