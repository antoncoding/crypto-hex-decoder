const RLP = require('rlp');


function toJSON(data) {
    if (data instanceof Array) {
        return data.map(toJSON);
    }
    if (!Buffer.isBuffer(data)) {
        throw Error("Invalid Data");    
    } 
    return '0x' + data.toString('hex');
}

module.exports = function(hex) {
    
    const decodedRawTx = RLP.decode(hex);    
    
    // // RAW TRANSACTION Fields: Nonce, Gas Price, Start Gas, To, Value, Input, v, r, s
    if (decodedRawTx.length != 9) {
        throw Error('could not')
    }    

    return {
        nonce: parseInt(toJSON(decodedRawTx[0])),
        gasPrice: parseInt(toJSON(decodedRawTx[1])),
        startGas: parseInt(toJSON(decodedRawTx[2])),
        to: toJSON(decodedRawTx[3]),
        valueInWei: parseInt(toJSON(decodedRawTx[4])),
        valueInEther: parseInt(toJSON(decodedRawTx[4]))/Math.pow(10,18),
        inputData: toJSON(decodedRawTx[5]),
        v: toJSON(decodedRawTx[6]),
        r: toJSON(decodedRawTx[7]),
        s: toJSON(decodedRawTx[8])
    } 
    
}