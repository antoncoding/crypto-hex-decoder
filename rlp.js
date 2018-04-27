function rlpDecode(input) {
    if (!input || input.length <= 0) {
        return
    }
    var lengthDecoded = decodeLength(input);

    console.log("output: "+JSON.stringify(lengthDecoded));
    
    rlpDecode(input.substring(lengthDecoded.offset + lengthDecoded.len, input.length));
}

function decodeLength(input) {
    var length = input.length;
    if (!input || length < 2) {
        return "";
    }
    if (input.substring(0,2) != "0x") {
        input = "0x"+input;
        length += 2;
    }
    if (length < 4) {
        return "";
    }
    var prefix = parseInt(input.substring(0,4));    
    console.log("prefix:"+prefix);
    console.log("Length:"+length);
    console.log("prefix - 247:"+(prefix - 247));
    console.log("parseInt(input.substring(0, prefix - 247)):"+(parseInt(input.substring(0, prefix - 247))));
    console.log("prefix - 247 + parseInt(input.substring(0, prefix - 247)):"+ (prefix - 247 + parseInt(input.substring(0, prefix - 247))));
    var strLen, lenOfStrLen, listLen, lenOfListLen;
    if (prefix <= 127) {
        console.log('1');
        return ({offset: 0, len: 1, type: "str"});
    }
    else if (prefix <= 183 && length > prefix - 128) {
        console.log('2');
        strLen = prefix - 128;
        return ({offset: 1, len: strLen, type: "str"});
    }
    else if (prefix <= 191 && (length > prefix - 183) && length > (prefix - 183 + parseInt(input.substring(0,prefix - 183)) ) ) {
        console.log('3');
        lenOfStrLen = prefix - 183;
        strLen = input.substring(0, lenOfStrLen);
        return ({offset: 1+lenOfStrLen, len: strLen, type: "str"});
    }
    else if ( prefix <= 247 && length > prefix - 192 ) {
        console.log('4');
        listLen = prefix - 192;
        return ({offset: 1, len: listLen, type: "list"});
    }
    else if (prefix <= 255 && (length > prefix - 247) && length > (prefix - 247 + parseInt(input.substring(0, prefix - 247))) ) {
        console.log('5');
        lenOfListLen = prefix - 247;
        listLen = parseInt(input.substring(0, lenOfListLen));
        return ({offset: 1, len: listLen, type: "list"});
    }
    else {
        console.log("ERROR");
        process.exit(1)
    }

}

// function toInteger(b){}
//     var length = b.length;
//     if (!length || length <= 0) {
//         console.log("input is null");
//     } 
//     else if (length == 1) {

//     }
        
//     elif length == 1:
//         return ord(b[0])
//     else:
//         return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
// }
rlpDecode("0xf86b028511cfc15d00825208940975ca9f986eee35f5cbba2d672ad9bc8d2a08448766c92c5cf830008026a0d2b0d401b543872d2a6a50de92455decbb868440321bf63a13b310c069e2ba5ba03c6d51bcb2e1653be86546b87f8a12ddb45b6d4e568420299b96f64c19701040");