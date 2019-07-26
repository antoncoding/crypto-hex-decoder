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

module.exports = encodeAddress;