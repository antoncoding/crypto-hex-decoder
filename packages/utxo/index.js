const bitcoinjs = require('bitcoinjs-lib');
const bscript = bitcoinjs.script

/**
 * Decode utxo hex.
 * @param {string} hex
 */
function decode (hex) {
  let tx = bitcoinjs.Transaction.fromHex(hex)
  
  tx.ins.forEach(input=>{
    if (input.witness.length > 0){
      input.type = 'Segwit'
      input.witness = decodeWitness(input.witness)
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
        input.type = 'Unkown'
        intput.script = {
          hex: decodedScript
        }
      }
    }
    input.hash = input.hash.toString('hex')
  })

  tx.outs.forEach(output => {
    output.script = bscript.toASM(output.script)
  })

  tx.totalValue = sumOutputValue(tx)

  return tx;
};

/**
 * Sum value (satoshi) in all outputs
 * @param {Transaction} tx
 * @returns {number} satoshis 
 */
function sumOutputValue (tx){
  let totalValue = 0;
  if (tx && tx.outs && tx.outs.length > 0) {
    totalValue = tx.outs.map(out => out.value).reduce(reducer)
  }
  return totalValue
}

/**
 * convert witness hex array to object
 * @param {Array} witness 
 * @return {signature: string, publicKey: string, hashType:number}
 */
function decodeWitness(witness){
  const { signature: sigBuf, hashType } = bscript.signature.decode(witness[0])
  const signature = sigBuf.toString('hex')
  const publicKey = witness[1].toString('hex')
  return { signature, publicKey, hashType }
}

function reducer(a, b){ return a + b}

module.exports.decode = decode;