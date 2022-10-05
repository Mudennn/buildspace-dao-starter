import sdk from "./1-initialize-sdk.js"
import {MaxUint256} from "@ethersproject/constants"

const editionDrop = sdk.getEditionDrop("0x2d3Ab3819b99D2efd02446040c9142aD4AfF1521");

(async () => {
    try {
        //Define out claim conditions, this is an array of objects because
        // we can have multiplephase starting at different times if we want to
        const claimCondition = [{
            // When people are gonna be able to start claiming the NFTS (now)
            startTime: new Date(),
            // The maximum number of NFTS that can be claimed.
            maxQuantity: 50_000,
            // The price of our NFT (free)
            price: 0,
            // The amount of NFTs people can claim in one transaction
            quantityLimitPerTransaction: 1,
            // Set the wait between transaction to MaxUint256, which means
            // people are only allowed to claim once.
            waitInSeconds: MaxUint256,
        }]

        await editionDrop.claimConditions.set("0", claimCondition);
        console.log("✅ Successfully set claim condition!");
        } catch (error) {
        console.error("Failed to set claim condition", error);
        }
})();

// SDK initialized by address: 0xE4b174c889832d0f53B36f976aB842EB9c43C229 
// SDK initialized by address: 0xE4b174c889832d0f53B36f976aB842EB9c43C229