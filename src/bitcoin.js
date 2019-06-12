const bitcoin = require('bitcoinjs-lib');
const bscript = bitcoin.script
const bscriptSig = bitcoin.script.signature

module.exports = function (hex) {
    let tx = bitcoin.Transaction.fromHex(hex)
    
    tx.ins.forEach(input=>{
        input.hash = input.hash.toString('hex')
        // input.sig = bscriptSig.decode(input.script)
    })

    tx.outs.forEach(output => {
        output.script = bscript.toASM(output.script)
    })

    // Sum output values
    let totalValue = 0;
    if (tx && tx.outs && tx.outs.length > 0) {
        totalValue = tx.outs.map(out => out.value).reduce(reducer)
        tx.totalValue = totalValue
    }

    return tx;
};

const reducer = (a, b) => a + b

