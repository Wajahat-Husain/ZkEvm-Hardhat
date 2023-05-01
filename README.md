# ZkEvm-Hardhat

This project is a boilerplate to kickstart your smart contract development using the Hardhat development environment. It includes a basic structure and some sample smart contracts, tests, and scripts to help you get started quickly and efficiently.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Getting Started

These instructions will guide you on how to set up your local development environment and use this boilerplate for your own projects.

### Prerequisites

Before you start, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) v16.17.0 or later
- [npm](https://www.npmjs.com/) v9.4.1 or later
- [Hardhat](https://hardhat.org/) v2.14.0or later
- [chai](https://www.chaijs.com/) v4.3.7 or later

### Installation

1. Clone the repository

```shell
git clone https://github.com/Wajahat-Sudozai/ZkEvm-Hardhat.git
```

2. Change to the project directory

```shell
cd ZkEvm-Hardhat
```

```shell
npm install  
```

## Usage

This section will provide you with examples of how to interact with your smart contracts and run the project.

### Compiling Smart Contracts

Compile your smart contracts by running the following command:

```shell
npx hardhat compile 
```

### Deploying & Verifying Smart Contracts on Etherscan

To verify your smart contracts on Etherscan, first list the available networks by running the following command:

```shell
npx hardhat verify --list-networks
```
Then, verify and deploy your smart contract on the Custom added network polygonZKEVMTestnet or polygonZKEVMMainnet.

## Deployment

This section should provide instructions on how to deploy your smart contracts to different networks.

### Deploying Smart Contracts

To deploy your smart contracts, run the following command

Deploy on testnet:

```shell
npx hardhat run scripts/deploy.js --network polygonZKEVMTestnet
```
Deploy on mainnet:

```shell
npx hardhat run scripts/deploy.js --network polygonZKEVMMainnet
```
Networks :
- polygonZKEVMTestnet
- polygonZKEVMMainnet

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Create a new Pull Request


