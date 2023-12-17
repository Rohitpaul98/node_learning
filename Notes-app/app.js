// const fs = require("fs");
// fs.writeFileSync('notes.txt', 'This file was created by Nodejs');
// fs.appendFileSync('notes.txt', 'and this is Challenge 1');
// const name = "Rohit"
// const Validator = require('validator');
// const NamePrinter = require("./utils");
// console.log(color.white.bold("Success!!"));
// console.log(color.blue.bgRed("From Utils--->", NamePrinter()))
// console.log("isEmail?", color.bgGreen(Validator.isEmail("rohit@gmail.com")));
const color = require('chalk');
const yargs = require('yargs');
const notes = require("./notes");
console.log(color.bgGreen.blue.bold("MyNote--->", notes()));

//Accessing Commandline arguements.
//Create add command
yargs.version('1.0.0')
yargs.command({
    command: "add",
    description: "Adds a new note",
    handler: () => { console.log("Adding a note..."); },
})
//Create remove command
yargs.command({
    command: "remove",
    description: "Removes a note",
    handler: () => { console.log("Removing a note..."); },
})
//Create command to list all notes
yargs.command({
    command: "show notes",
    description: "Shows all notes",
    handler: () => { console.log("Loading the list...") }
})
//Create command to read
yargs.command({
    command: "read",
    description: "Reads all notes",
    handler: () => { console.log("reading...") }
})
console.log(yargs.argv)//array will be printed argv-arguement vector ,process- it is group of methods