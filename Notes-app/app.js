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


//Accessing Commandline arguements.
//Create add command
yargs.version('1.0.0')
yargs.command({
    command: "add",
    description: "Adds a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note's content",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        console.log("Title :" + argv.title)
        console.log(" Body :" + argv.body)
        notes.addNote(argv.title, argv.body);
    },
})
//Create remove command
yargs.command({
    command: "remove",
    description: "Removes a note",
    builder: {
        title: {
            describe: "Removes the note of given title",
            demandOption: true,

        }

    },
    handler: (argv) => {
        console.log(color.bgred.inverse("Removing a note..."));
        notes.removeNote(argv.title)
    },
})
//Create command to list all notes
yargs.command({
    command: "show notes",
    description: "Shows all notes",
    handler: () => {
        console.log(color.green.inverse("Loading the list..."));
        // console.log(notes.loadNotes());
        const allNotes = notes.loadNotes();
        allNotes.map((note, key) => console.log(`${key + 1}.) ${note.title}`));
    }
})
//Create command to read
yargs.command({
    command: "read",
    description: "Reads note by serial",
    builder: {
        serial: {
            describe: "Get note by serial number",
            demandOption: true
        }
    },
    handler: (argv) => {
        if (argv.serial >= 0 && argv.serial < notes.loadNotes().length) {
            console.log(color.green.inverse("reading..."))
            setTimeout(() => { console.log(color.green.inverse("Note found with this title!")) }, 2000);
            setTimeout(() => { console.log(notes.loadNotes()[argv.serial]); }, 3000);


        }
        else {
            console.log(color.red.inverse("Entered serial number is not available"));
        }

    }
})
// console.log(yargs.argv)//array will be printed argv-arguement vector ,process- it is group of methods
yargs.parse();//parsing the command line arguments.