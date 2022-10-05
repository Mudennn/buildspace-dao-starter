import { AddressZero } from "@ethersproject/constants"
import sdk from "./1-initialize-sdk.js"

(async () => {
    try {
        // Deploy standard ERC-20 contract.
        const tokenAddress = await sdk.deployer.deployToken({
            name: "Black and White Governance Token",
            symbol: "BNW",
            primary_sale_recipient: AddressZero,
        });
        console.log(
            "✅ Successfully deployed token module, address:",
            tokenAddress
        );
    } catch (error) {
        console.error("failed to deploy token module", error);
    }
})();

// SDK initialized by address: 0xE4b174c889832d0f53B36f976aB842EB9c43C229 
// Successfully deployed token module, address: 0xc1c431838888fA4f27E6bdb6470a87ABd18830Cf 