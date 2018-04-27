# Ethereum Raw Transaction decoder


<!-- 
var dog = "dog";
console.log("encode: "+RLP.encode(dog));
console.log(' decoded what was encoded(dog): '+RLP.decode(RLP.encode(dog)));
var t = ["cat","dog"];
console.log("encode: "+RLP.encode(t));
console.log(' decoded what was encoded(array): '+RLP.decode(RLP.encode(t)));

TRANSACTION FORMAT https://ethereum.stackexchange.com/questions/1990/what-is-the-ethereum-transaction-data-structure
NONCE
GAS PRICE
STARTGAS
TO 
VALUE
DATA
V https://ethereum.stackexchange.com/questions/15766/what-does-v-r-s-in-eth-gettransactionbyhash-mean
R 
S
Transaction https://etherscan.io/tx/0x09b092b86ffc8f425b405d3ac0ef1ec51269fa024e64b4b5778961a4d588c982
0xf86e82cd70850bdfd63e00827918943c601b93eaad76d2f66f71a0b8c22dbbf2e71db688287bb23d4c9350008025a09f3842a8fd9d6228d4ee226524e249c81eba22c53a87855f2244b2064c8036d6a073c767ae047bce30dee587e5233649acbae36b10d97b39d11fb9b2ccabf9b925
RLP Algorithm -> https://github.com/ethereum/wiki/wiki/RLP
RLP -> first byte is 0xf8, it is a list. the length of the list is the first byte minus 0xf7, so the length is 1 byte, which means 8 in
next step remove first byte(considering it as 0xf8)
0x6e82cd70850bdfd63e00827918943c601b93eaad76d2f66f71a0b8c22dbbf2e71db688287bb23d4c9350008025a09f3842a8fd9d6228d4ee226524e249c81eba22c53a87855f2244b2064c8036d6a073c767ae047bce30dee587e5233649acbae36b10d97b39d11fb9b2ccabf9b925
0x6e is 110, so it is a String. AS it is less than 127, the string is itself. NONCE is 0x6e -->