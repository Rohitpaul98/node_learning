// const fs = require("fs");
// fs.writeFileSync('notes.txt', 'This file was created by Nodejs');
// fs.appendFileSync('notes.txt', 'and this is Challenge 1');
// const name = "Rohit"
// const Validator = require('validator');
const color = require('chalk');
const notes = require("./notes");
// const NamePrinter = require("./utils");
console.log(color.bgGreen.blue.bold("MyNote--->", notes()));
// console.log(color.white.bold("Success!!"));
// console.log(color.blue.bgRed("From Utils--->", NamePrinter()))
// console.log("isEmail?", color.bgGreen(Validator.isEmail("rohit@gmail.com")));

//Accessing Commandline arguements.
console.log(process.argv[2])//array will be printed argv-arguement vector ,process- it is group of methods