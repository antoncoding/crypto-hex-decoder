const utxoDecoder = require("../index");

test('omni p2wpkh', ()=>{
    const omniRawTx = '01000000000101cae51bf0c4791c6e20ee97adf5f4c2204ad3c9d42c4df7625e2918463efd353702000000171600148a99a17ee968fb47e3a446a24a49bed1f872808bffffffff03102700000000000017a914c7f51ad81af55f18a33dc5a95e79fe3b6e472667870000000000000000166a146f6d6e69000000000000001f000000007bdbc380463b01000000000017a914e9176b11d2e4c4fb15987fe404e6cb55f70c9236870247304402202652a083badfd8697acd968e01dbe5e62ac47031c43d0e2acc62cc82ac5a546902203e9494f4535a963763f40804c5cc161483b834f9e6b36fd8bbf49c25312112340121026747a52363a3531046f5c789cb6b1d1917164e8d77b833eb63b89060bb1d04c800000000';
    let decodedTx = utxoDecoder.decode(omniRawTx);
    expect(decodedTx.ins.length).toBe(1)
    expect(decodedTx.ins[0].witness).toHaveProperty('signature')
    expect(decodedTx.ins[0].witness).toHaveProperty('publicKey')
    expect(decodedTx.outs.length).toBe(3)
})
