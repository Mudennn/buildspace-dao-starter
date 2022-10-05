import sdk from './1-initialize-sdk.js';

// Vote address
const vote = sdk.getVote("0x9B1B054D21eA244d4Fb495c6ce06E5e0Aa035355");

// ERC-20 contract
const token = sdk.getToken("0xc1c431838888fA4f27E6bdb6470a87ABd18830Cf");

(async () => {
    try {
        // Give our treasury the power to mint additional token if needed.
        await token.roles.grant("minter", vote.getAddress());

        console.log (
            "Successfully gave vote contract permissions to act on token contract"
        );
    } catch (error) {
        console.error(
            "failed to grant vote contract permissions on token contract",
            error
        );
        process.exit(1);
    }

    try {
        // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await token.balanceOf(
            process.env.WALLET_ADDRESS
        );

        // Grab 90% of the supply that we hold.
        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        // Grab 90% of the supply to our voting contract.
        await token.transfer(
            vote.getAddress(),
            percent90
        );
        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract")
    } catch (err) {
        console.error("failed to transfer tokens to vote contract", err);
      }
})();

// SDK initialized by address: 0xE4b174c889832d0f53B36f976aB842EB9c43C229