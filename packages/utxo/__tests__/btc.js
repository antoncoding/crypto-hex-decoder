const utxoDecoder = require("../index");

test('btc segwit', ()=>{
    const btcRawTx = '010000000001018c5eb9b0dc16998a093d7b14ade1f08c7e50e7850300f2b9c7ddbcb91940a6520000000017160014a766979873e93859be7ce57d2d0260abe8a4c081ffffffff03220200000000000017a914e9176b11d2e4c4fb15987fe404e6cb55f70c9236870000000000000000166a146f6d6e69000000000000001f0000000005f5e10056e400000000000017a914c7f51ad81af55f18a33dc5a95e79fe3b6e4726678702483045022100d5746ae871e84a30fec792d02656a156ea6ee2f1aecc62c05bfecb77b339ecef02206c2392c29918c01e3bceed93f62b448bdcf21f4a32e28e26be922f5234eb900a012102fe5ab04839d0fc726b0dc4a7e1a8104684c9e687bd64d3304b10538d7090e91900000000';
    let decodedTx = utxoDecoder.decode(btcRawTx);
    expect(decodedTx.ins.length).toBe(1)
    expect(decodedTx.ins[0].witness).toHaveProperty('signature')
    expect(decodedTx.ins[0].witness).toHaveProperty('publicKey')
    expect(decodedTx.ins[0].witness.hashType).toBe(1)
})

test('btc p2pkh', ()=>{
    const btcRawTx = '0100000001cae51bf0c4791c6e20ee97adf5f4c2204ad3c9d42c4df7625e2918463efd3537020000006b483045022100b00341f804157ed7c564f7acc6e5cc44f115708f0f77001c0fdd38e7b2dc480a0220724c9b9162f14936b25e5c16e44827d9549f3976bb184f478c8e455e93392a650121026747a52363a3531046f5c789cb6b1d1917164e8d77b833eb63b89060bb1d04c8ffffffff0210270000000000001976a9148a99a17ee968fb47e3a446a24a49bed1f872808b88ac463b0100000000001976a9148a99a17ee968fb47e3a446a24a49bed1f872808b88ac00000000';
    let decodedTx = utxoDecoder.decode(btcRawTx);
    expect(decodedTx.ins.length).toBe(1)
    expect(decodedTx.ins[0].script).toHaveProperty('signature')
    expect(decodedTx.ins[0].script).toHaveProperty('publicKey')
    expect(typeof decodedTx.outs[0].script).toBe('string')
})
