const bitcoinjs = require('bitcoinjs-lib');
const bscript = bitcoinjs.script

module.exports = function (hex) {
    let tx = bitcoinjs.Transaction.fromHex(hex)
    
    tx.ins.forEach(input=>{
        // Decode Witness Data
        if (input.witness.length > 0){
            input.type = 'Segwit'
            let {signature, hashType} = bscript.signature.decode(input.witness[0])
            signature = signature.toString('hex')
            let publicKey = input.witness[1].toString('hex')
            input.witness = {signature, publicKey, hashType}
            
            input.script = {
                hex: input.script.toString('hex')
            }
        } else {
            let decodedScript = bscript.toASM(input.script).split(" ")
            if(decodedScript.length === 2){
                input.type = 'P2PKH'
                input.script = {
                    signature: decodedScript[0],
                    publicKey: decodedScript[1]
                }
            }
            else{
                intput.script = {hex:decodedScript}
            }
        }
        input.hash = input.hash.toString('hex')
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