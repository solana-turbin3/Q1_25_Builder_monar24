import bs58 from 'bs58';
// import * as prompt from 'prompt-sync';

// Function to convert a Base58 string to a Uint8Array (wallet)
function base58ToWallet(base58: string): Uint8Array {
    try {
        const wallet = bs58.decode(base58);
        console.log("Decoded Wallet (Uint8Array):", wallet);
        return wallet;
    } catch (e) {
        console.error("Error decoding Base58:", e);
        throw e;
    }
}

// Function to convert a Uint8Array (wallet) to a Base58 string
function walletToBase58(wallet: Uint8Array): string {
    try {
        const base58 = bs58.encode(wallet);
        console.log("Encoded Base58:", base58);
        return base58;
    } catch (e) {
        console.error("Error encoding to Base58:", e);
        throw e;
    }
}

// Example usage
(async () => {
    // Example Base58 string
    const base58String = "<INSERT_PK>";
    console.log("Base58 String:", base58String);

    // Decode Base58 to Uint8Array
    const walletArray = base58ToWallet(base58String);
    console.log(`\n${walletArray}`);

    
    // Encode Uint8Array back to Base58
    const encodedBase58 = walletToBase58(walletArray);

    console.log(`\n${encodedBase58}`);


})();
