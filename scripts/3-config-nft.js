import sdk from "./1-initialize-sdk.js";
import { readFileSync} from "fs";

const editionDrop = sdk.getEditionDrop("0x2d3Ab3819b99D2efd02446040c9142aD4AfF1521");

(async () => {
    try {
        await editionDrop.createBatch([
            {
            name: "Men Walking Photo",
            description: "This NFT will give you access to BNWDAO",
            image: readFileSync("scripts/assets/bnw.JPG"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
      console.error("failed to create the new NFT", error);
    }
})();

// SDK initialized by address: 0xE4b174c889832d0f53B36f976aB842EB9c43C229