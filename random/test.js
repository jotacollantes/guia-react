function genRandonString(length) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }
  
 //console.log(genRandonString(9));


 const today = new Date();
 console.log('inicio',today)
 for (let index = 1; index <= 7000000; index++) {
    console.log(genRandonString(9)," ",index);
    
 }
 console.log('final',today)