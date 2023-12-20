const fs = require('fs');
const chalk = require('chalk');

//sample method by Rohit to test the app
const getNotes = () => {
    const myNotes = "Today I went to Barista and had an espresso..."
    return myNotes;
}
///////////////////////////////////////////
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json")
        return JSON.parse(dataBuffer);
    } catch (e) {
        return [];
    }

}
const addNote = (title, body) => {
    const notes = loadNotes();
    const notTitleNotes = notes.filter((note) => {
        return note.title === title;
    })
    if (notTitleNotes.length === 0) {

        notes.push({ title: title, body: body });
        const notesJSON = JSON.stringify(notes);
        fs.writeFileSync("notes.json", notesJSON);
        console.log(chalk.green.inverse("Note Added!!"))
    }
    else {
        console.log(chalk.red.inverse("Note with this title already exists!"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    })

    if (notes.length > notesToKeep.length) {

        const converted = JSON.stringify(notesToKeep)
        fs.writeFileSync("notes.json", converted);
        console.log(chalk.green.inverse("Note found and removed with this title!"))
    }
    else {
        console.log(chalk.red.inverse("No Note found with this title!"))
    }


}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    loadNotes: loadNotes,
    removeNote: removeNote
};