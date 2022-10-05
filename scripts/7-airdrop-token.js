import sdk from "./1-initialize-sdk.js";

// Address for ERC-1155 membership NFT contract
const editionDrop = sdk.getEditionDrop("0x2d3Ab3819b99D2efd02446040c9142aD4AfF1521");

// Address for ERC-20 token contract
const token = sdk.getToken("0xc1c431838888fA4f27E6bdb6470a87ABd18830Cf");

(async () => {
    try {
      // Grab all the addresses of people who own our membership NFT, 
      // which has a tokenId of 0.
      const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
  
      if (walletAddresses.length === 0) {
        console.log(
          "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
        );
        process.exit(0);
      }
  
      // Loop through the array of addresses.
      const airdropTargets = walletAddresses.map((address) => {
        // Pick a random # between 1000 and 10000.
        const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
        console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
  
        // Set up the target.
        const airdropTarget = {
          toAddress: address,
          amount: randomAmount,
        };
  
        return airdropTarget;
      });
  
      // Call transferBatch on all our airdrop targets.
      console.log("🌈 Starting airdrop...");
      await token.transferBatch(airdropTargets);
      console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
      console.error("Failed to airdrop tokens", err);
    }
  })();