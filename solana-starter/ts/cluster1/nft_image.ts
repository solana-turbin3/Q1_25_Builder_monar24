import wallet from "../Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"
import * as fs from 'fs';

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = await readFile("./rug.png")
        console.log('image', image);

        //2. Convert image to generic file.
        const generic_file = createGenericFile(image, "rug.png", {
            displayName: "Rug",
            contentType: "image/png",
        });

        //3. Upload image
        const [myUri] = await umi.uploader.upload([generic_file]) 
        //USE devnet.irys.xyz instead of Arweave:
        console.log("Your image URI: ", myUri);

        //https://devnet.irys.xyz/71M9GquPesJ9LyiGiJKFxveood8kY6GqHP92GS2YvQrE

    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
