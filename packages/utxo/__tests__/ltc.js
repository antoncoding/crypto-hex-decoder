const utxoDecoder = require("../index");

test('ltc p2wpkh', ()=>{
    const ltcRawTx = '010000000001011be5a299e70b188004258e77eb66a26ede7107609b5bf75cdd2d3b82ec2d9bb201000000171600144ed20ef6efb1c1925db64648c6bc569199de2161ffffffff02a81f0b000000000017a914bdffa40b4a490984bbe6a4bbe1af6dd9cbf06a8c87649500000000000017a91443880567fe154beed716e61d4e4e3cf45453606887024730440220334e414578bc50bc85d0c65651390f8311fc83f40c4f20c4e22b765f87cb0d87022070c25ee4b3deba660ad078c597d98f1e05c1ffd004ad525ac24903f04007159c012102c44a3acfbdff560e9be4641e5679d9ef0cca3264d2e337631f4de3ae34b20ba100000000';
    let decodedTx = utxoDecoder.decode(ltcRawTx);
    expect(decodedTx.ins.length).toBe(1)
    expect(decodedTx.ins[0].witness).toHaveProperty('signature')
    expect(decodedTx.ins[0].witness).toHaveProperty('publicKey')
    expect(decodedTx.ins[0].witness.hashType).toBe(1)
    expect(decodedTx.outs.length).toBe(2)
})
