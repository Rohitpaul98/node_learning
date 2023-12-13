const fs = require('fs');
// fs.writeFileSync('MyFile.txt', 'My journey towards a nodejs developer')

// fs.appendFileSync('MyFile.txt', ' and I am learning only want consistency');

// console.log(buff_data);

// fs.renameSync('MyFile.txt', 'MyFirstFile')
// fs.appendFileSync('MyFirstFile.txt', ' also want to become a successfull MERN stack developer.')
const buff_data = fs.readFileSync('MyFirstFile.txt')
const read_data = buff_data.toString();
// fs.unlinkSync('MyFirstFile');
console.log(read_data);