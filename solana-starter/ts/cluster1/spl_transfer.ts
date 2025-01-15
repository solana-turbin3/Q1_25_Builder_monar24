import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("Br8bFA3czu4m2ZC95TqS9e1JpMy3cHHH8EoaSvQNp1MU");

// Recipient address
const to = new PublicKey("DBWjJeSEh4P7Fb1B5btmE8h34k6BNx9ieynX97xpWimJ");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
         const fromAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${fromAta.address.toBase58()}`);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        console.log(`Your ata is: ${toAta.address.toBase58()}`);

        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, fromAta.address, toAta.address, keypair, 2e6);
        console.log('tx: ', tx)

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

// Completed Tx: 4jbk4JnmpTWn1ktdb5jKhESgyQAtDhSVEmNQygvzcmDt3L3YCjb3Wu5GLjks2M7vwcUdhzCqYNAPeqLnGc16SR1w