import sdk from './1-initialize-sdk.js';

// ERC-20 contract
const token = sdk.getToken("0xc1c431838888fA4f27E6bdb6470a87ABd18830Cf");

(async () => {
    try {
        // Log the current roles
        const allRoles = await token.roles.getAll();
        console.log("👀 Roles that exist right now:", allRoles)

        // revoke all the superpowers your wallet had over the ERC-20 contract
        await token.roles.setAll({admin:[], minter: []});
        console.log (
            "🎉 Roles after revoking ourselves",
            await token.roles.getAll()
        );
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract")
    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasury", error)
    }
})();

// 👀 Roles that exist right now: {
//     admin: [ '0xE4b174c889832d0f53B36f976aB842EB9c43C229' ],
//     minter: [
//       '0xE4b174c889832d0f53B36f976aB842EB9c43C229',
//       '0x9B1B054D21eA244d4Fb495c6ce06E5e0Aa035355'
//     ],
//     transfer: [
//       '0xE4b174c889832d0f53B36f976aB842EB9c43C229',
//       '0x0000000000000000000000000000000000000000'
//     ]
//   }
//   🎉 Roles after revoking ourselves {
//     admin: [],
//     minter: [],
//     transfer: [
//       '0xE4b174c889832d0f53B36f976aB842EB9c43C229',
//       '0x0000000000000000000000000000000000000000'
//     ]
//   }
//   ✅ Successfully revoked our superpowers from the ERC-20 contract