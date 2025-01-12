import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const rpc_url : string = "https://api.devnet.solana.com";
const connection = new Connection(rpc_url);

(async () => {
    try {
        // We're going to claim 2 devnet SOL tokens
        console.log(keypair.publicKey);
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);

    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();