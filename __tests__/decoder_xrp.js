const txHexDecoder = require("raw-transaction-hex-decoder");

test('xrp', ()=>{
    let xrpRawTx = '1200002280000000240017E7FF2E7031990B201B02DB1E4E6140000001636BDDC0684000000000030D40732102C2EDA75565BA8D3CBD96FB28D53C9BE1B7A4DC1AF6FF1B2EBBD478D520BED52E744730450221009E691C9D9DDF7A338EA8EA10D0921704740093956A7FBA3C3F75E05E10D6AE640220571BFA190E36AD5540FDE1D075146D1DF61BADFC3B67C31578A91E47B63AC4438114C10AC406D469253B6DC27D26BD54AE891179F5DD8314D3A0F1993876211F413D4EDF0A70CEE0C8212DB8';
    const decodedTx = txHexDecoder.decodeXrpRawTx(xrpRawTx);
    expect(decodedTx).toHaveProperty('Account')
    expect(decodedTx).toHaveProperty('Amount')
    expect(decodedTx).toHaveProperty('Destination')
    expect(decodedTx).toHaveProperty('DestinationTag')
    expect(decodedTx).toHaveProperty('Flags')
    expect(decodedTx).toHaveProperty('Fee')
    expect(decodedTx).toHaveProperty('LastLedgerSequence')
    expect(decodedTx).toHaveProperty('Sequence')
    expect(decodedTx).toHaveProperty('TransactionType')
    expect(decodedTx).toHaveProperty('TxnSignature')  
})