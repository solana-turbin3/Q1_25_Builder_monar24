import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../Turbin3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);
const metadataURI = "https://devnet.irys.xyz/2ArrfoHjSpQxDU8FM4fppHYXAL4Vju63tAtBwPBp6YmH";

const amount = percentAmount(4, 2);

(async () => {
    let tx = createNft(umi, {
        name: "Cool Rug",
        uri: metadataURI,
        sellerFeeBasisPoints: amount,
        mint
    });
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log("Mint Address: ", mint.publicKey);

    //RUG here:
    // https://explorer.solana.com/tx/5gaF5qPkfUmMAfKgvmEidf737gbQswoyviSkcbQpr2RvGGFeoFCZqEEGcUePk7Z6FSTNHt6hM2aWJJu8ugroH1dV?cluster=devnet
    // Token Address: Dp4NNDRS3v9af7J5b1uoMyEJneRJzoFZ4ffhhrMqLujK

})();