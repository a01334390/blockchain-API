/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'first-network', 'connection-org1.json');

async function readBloodBag(id,user) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/blockchain-functions/wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(user);
        if (!userExists) {
            console.log('An identity for the user '+user+' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('blood');
        // Get the result and send it back
        const result = await contract.evaluateTransaction('readBloodBag',id);
        return JSON.parse(result)

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error
    }
}

async function getHistoryForBloodBag(id,user) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/blockchain-functions/wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(user);
        if (!userExists) {
            console.log('An identity for the user '+user+' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('blood');
        // Get the result and send it back
        const result = await contract.evaluateTransaction('getHistoryForBloodBag',id);
        return JSON.parse(result)

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error
    }
}

async function getRewardsHistory(userId,user) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/blockchain-functions/wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(user);
        if (!userExists) {
            console.log('An identity for the user '+user+' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('rewards');
        // Get the result and send it back
        const result = await contract.evaluateTransaction('getTransactionHistory',userId);
        return JSON.parse(result)

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error
    }
}

async function readWallet(userId,user) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '/blockchain-functions/wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(user);
        if (!userExists) {
            console.log('An identity for the user '+user+' does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('rewards');
        // Get the result and send it back
        const result = await contract.evaluateTransaction('readUser',userId);
        return JSON.parse(result)

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error
    }
}

module.exports = {
    readBloodBag,
    getHistoryForBloodBag,
    getRewardsHistory,
    readWallet
}
