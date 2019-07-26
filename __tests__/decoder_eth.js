const txHexDecoder = require("../index"); 
 
test('eth tx', ()=>{
    const ethEncodedRawTx = "0xf8898204a784ee6b280082b13d944890602be4d3c59041301a28a21f091c33ff6e8480a455cc4e570000000000000000000000005c0011dce5e21c3b9b7ba5ef364fb42df29b99471ba0c1d3982058cee8bd9ddc0fba815bb5670d0c4821f7ddd78f5bfcbedcca86682ca05a5650f0049a528817cb7306a62d2c6adda9ab5993af5195a3e89b5a12a771e8";
    const ethDecodedRawTx = txHexDecoder.decodeEthRawTx(ethEncodedRawTx);
    expect(ethDecodedRawTx).toHaveProperty('nonce')
    expect(ethDecodedRawTx).toHaveProperty('gasPrice')
    expect(ethDecodedRawTx).toHaveProperty('gasLimit')
    expect(ethDecodedRawTx).toHaveProperty('to')
    expect(ethDecodedRawTx).toHaveProperty('valueInWei')
    expect(ethDecodedRawTx).toHaveProperty('inputData')
    expect(ethDecodedRawTx).toHaveProperty('v')
    expect(ethDecodedRawTx).toHaveProperty('r')
})
