const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

exports.encrypt=function encrypt(text,callback) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    callback(iv.toString('hex')+"_"+key.toString('hex')+"_"+encrypted.toString('hex'));
}
  
exports.decrypt=function decrypt(pass,callback) {
    text=pass.split("_");
    let iv = Buffer.from(text[0], 'hex');
    let key=Buffer.from(text[1],'hex');
    let encryptedText = Buffer.from(text[2], 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    callback(decrypted.toString());
}
   