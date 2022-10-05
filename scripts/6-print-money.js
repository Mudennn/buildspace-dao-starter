import sdk from './1-initialize-sdk.js';

const token = sdk.getToken("0xc1c431838888fA4f27E6bdb6470a87ABd18830Cf");

(async () => {
    try {
        // max supply
        const amount = 1_000_000;
        // Interact with deployed ERC-20 contract and mint the tokens!
        await token.mintToSelf(amount);
        const totalSupply = await token.totalSupply();

        // Print out how manay of our token's are out there now!
        console.log("✅ There now is", totalSupply.displayValue, "$BNW in circulation")
    } catch (error) {
        console.error("Failed to print money", error);
      }
})();