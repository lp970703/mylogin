

// const encryptionSecret = '273f621ea5c8f895';
// const IV = '273f621ea5c8f893';
// const crypto = require('crypto');
// const algorithm = 'aes256';

// function encrypt(key) { // 有点像内部函数，可以直接在外部调用这个方法，外部调用直接obj.encrypt(key)就行，同理把encrypt相成一个对象，
//   const cipher = crypto.createCipheriv(algorithm, encryptionSecret, IV);
//   const encrypted = cipher.update('' + key, 'utf8', 'hex') + cipher.final('hex');
//   return encrypted;
// }

// function decrypt(encryptedKey) {
//   const decipher = crypto.createDecipheriv(algorithm, encryptionSecret, IV);
//   const decrypted = decipher.update(encryptedKey, 'hex', 'utf8') + decipher.final('utf8');
//   return decrypted;
// }

// const a = encrypt('aaa');
// console.log(a);

