import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// Vote address
const vote = sdk.getVote("0x9B1B054D21eA244d4Fb495c6ce06E5e0Aa035355");

// ERC-20 contract
const token = sdk.getToken("0xc1c431838888fA4f27E6bdb6470a87ABd18830Cf");

(async () => {
    try {
        // Create proposal to mint 420,000 new token to the treasury.
        const amount = 420_000;
        const description = "Should the DAO mint an additional" + amount + " token into the treasury?";
        const executions = [
            {
                // Our token contract that actually executes the mint.
                toAddress: token.getAddress(),
                // Our nativeToken is ETh. nativeTokenValue is the amount of ETH we want
                // to send in this proposal. In this case, we're sending 0 ETH.
                // We're just minitng new tokens to the treasury. So, set to 0/
                nativeTokenValue: 0,
                // We're doing a mint! And, we're minting to the vote, which is 
                // acting as our treasury.
                // in this case, we need to use ethers.js to convert the amount 
                // to the correct format. This is because the amoint is requires is in wei
                transactionData: token.encoder.encode(
                    "mintTo", [
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
        }];
        await vote.propose(description, executions);

        console.log("✅ Successfully created proposal to mint tokens")
    } catch (error) {
        console.log("failed to create first proposal", error);
        process.exit(1);
    }

    try {
        // Create proposal to transfer ourselves 6,900 tokens for being awesome
        const amount = 6_900;
        const description = "Should the DAO transfer" + amount + " tokens from the treasury to " +
            process.env.WALLET_ADDRESS + " for being awesome?";
        const executions = [
            {
                // Again, we're sending ourselves 0 ETH. Just sending our own token.
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    // We're doing atransfer from the treasury to our wallet.
                    "transfer",
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            },
        ];
        await vote.propose(description, executions);
        
        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
    }   catch (error) {
        console.error("failed to create second proposal", error)
    }
})();

// SDK initialized by address: 0xE4b174c889832d0f53B36f976aB842EB9c43C229
// ✅ Successfully created proposal to mint tokens
// ✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!