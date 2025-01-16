import wallet from "../Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/71M9GquPesJ9LyiGiJKFxveood8kY6GqHP92GS2YvQrE"

        const metadata = {
            name: "Cool Rug",
            symbol: "CR",
            description: "It's just a cool rug",
            image: image,
            attributes: [
                {trait_type: "coolness", value: '100000000'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };


        const myUri = await umi.uploader.uploadJson(metadata) ;
        console.log("Your metadata URI: ", myUri);
        //metadata URI: https://devnet.irys.xyz/2ArrfoHjSpQxDU8FM4fppHYXAL4Vju63tAtBwPBp6YmH
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
