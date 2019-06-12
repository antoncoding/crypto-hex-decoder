const rippleBinary = require('ripple-binary-codec');

module.exports = function(hex) {
    const decodedRawTx = rippleBinary.decode(hex)
    return decodedRawTx
}