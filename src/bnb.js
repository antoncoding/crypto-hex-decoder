const unMarshalBinaryLengthPrefixed = require('./utils/amino')

module.exports = function(hex) {
    const decodedRawTx = unMarshalBinaryLengthPrefixed(hex, result)
    return decodedRawTx
}

class Msg {
    constructor(opts){
      opts = opts || {}
      this.string = opts.address || ""
      this.buf = opts.buf || Buffer.alloc(0)
      this.price = opts.price || 0
      this.bool = opts.timeinforce || false
      this.quantity = opts.quantity || 0
      // this.coin = []
    }
}

const result = new Msg()