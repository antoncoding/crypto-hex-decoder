const bitcoinjs = require('bitcoinjs-lib');
const bscript = bitcoinjs.script

module.exports = function (hex) {
    let tx = bitcoinjs.Transaction.fromHex(hex)
    
    tx.ins.forEach(input=>{
        input.hash = input.hash.toString('hex')
        input.sig = bitcoinjs.script.signature.decode(input.script)
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

