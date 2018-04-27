const bitcoin = require('bitcoinjs-lib');

module.exports = function (hex) {
    const tx = bitcoin.Transaction.fromHex(hex);
    let totalValue = 0;
    if (tx && tx.outs && tx.outs.length > 0) {
        totalValue = tx.outs.reduce((a, b) => {
            a.value + b.value;
        }, 0);
    }
    tx.totalValue = totalValue;
    return tx;
}