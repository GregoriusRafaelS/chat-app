require('dotenv').config();

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const algorithm = 'aes-256-cbc';
const key = process.env.AES_KEY;
const iv = Buffer.from(process.env.AES_IV, 'utf-8'); 

// Hash MD5
const hashEmail = (email) => {
  return crypto.createHash('md5').update(email).digest('hex');
}

// Hash SHA256
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Enkripsi AES
const encryptAES = (text) =>{
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
} 

// Dekripsi AES
const decryptAES = (encryptedText) =>{
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}  

// Dekripsi && enkripsi Caesar
const caesarCipher = (str, shift, decrypt = false) => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97);
      return l;
    })
    .join('');
};

// supeer eknripsi
const superEnkripsi = (str, shift, decrypt = false) =>{
  let chiperText = encryptAES(str);
  chiperText = caesarCipher(chiperText, shift, decrypt);
  return chiperText;
}

// supeer dekripsi
const superDekripsi = (str, shift, decrypt = false) =>{
  str = caesarCipher(str, shift, decrypt);
  const plainText = decryptAES(str);
  return plainText;
}

const encryptImage = (fileName) => {
  const imageBuffer = fs.readFileSync(path.resolve(__dirname, `../files/${fileName}`));
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const encryptedBuffer = Buffer.concat([cipher.update(imageBuffer), cipher.final()]);
  const encryptedHex = encryptedBuffer.toString('hex');
  const separatedPath = fileName.split('.');
  const absolutePath = path.resolve(__dirname, `../files/${separatedPath[0]}.txt`);
  fs.writeFileSync(absolutePath, encryptedHex);
}

const decryptImage = (fileName) => {
  const separatedPath1 = fileName.split('\\');
  const separatedPath2 = separatedPath1[1].split('.');
  const encryptedHex = fs.readFileSync(path.resolve(__dirname, `../files/${separatedPath2[0]}.txt`), 'utf-8');
  const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  const decryptedBuffer = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
  const absolutePath = path.resolve(__dirname, `../files/${separatedPath2[0]}-decrypt-image.${separatedPath2[1]}`);
  fs.writeFileSync(absolutePath, decryptedBuffer);
}

module.exports = { 
  hashEmail,
  hashPassword,
  encryptAES,
  decryptAES,
  caesarCipher,
  superEnkripsi,
  superDekripsi,
  encryptImage,
  decryptImage
};