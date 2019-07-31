const bech32 = require('bech32');

/**
 * Encode to normal bnb addresses
 * @param {Buffer} buff raw buf address
 * @param {boolean} testnet default = false
 * @return {string} bnb prefixed addr
 */
function encodeAddress(buff, testnet= false) {
    const prefix = testnet? "tbnb" : "bnb";
    const words = bech32.toWords(buff)
    return bech32.encode(prefix, words)
}

/**
 * Decodes an address in bech32 format.
 * @param {string} value the bech32 address to decode
 */
function decodeAddress(value){
    const decodeAddress = bech32.decode(value)
    return Buffer.from(bech32.fromWords(decodeAddress.words))
}

module.exports = {
    decodeAddress,
    encodeAddress
};