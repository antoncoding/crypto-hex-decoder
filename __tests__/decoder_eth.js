const txHexDecoder = require("../index"); 
 
test('eth tx', ()=>{
    const ethEncodedRawTx = "0xf8a90385012a05f20082cd1494b8c77482e45f1f44de1745f52c74426c631bdd5280b844a9059cbb000000000000000000000000aaa838f9a1a03432d26dc8f09f8a5ed958b4e633000000000000000000000000000000000000000000000000064d093e281e880026a06e563f6dc30cdd6388e2ff95f2e0367e1f86bbab0fba0a48024a8e1d98a49d12a006f5a6e3be757cea0e8d09d8109de6a4ec58b7a3c5758e37380922263b11c785";
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
