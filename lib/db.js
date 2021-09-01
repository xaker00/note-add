const fs = require('fs');
const uuidv4 = require('uuid').v4;

const dbFile = 'db.json'

function NewDB(){
    const db = {notes: []};
    fs.writeFileSync(dbFile, JSON.stringify(db));
}

function GetNotes(id){
    const db = JSON.parse(fs.readFileSync(dbFile));

    if(id){
        return db.notes.filter(q => q.id === id);
    }
    return db.notes;
}

function AddNote(note){
    let db = JSON.parse(fs.readFileSync(dbFile));
    note.id = uuidv4();
    if(!note.timestamp)note.timestamp = Date.now();
    db.notes.push(note);
    fs.writeFileSync(dbFile, JSON.stringify(db));
    return note;
}


function EditNote(note){
    let db = JSON.parse(fs.readFileSync(dbFile));
    db.notes = db.notes.map(n => {
        if(note.id === n.id){
            n.title = note.title;
            n.text = note.text;
            n.timestamp = note.timestamp;
        }
        return n;
    });
    fs.writeFileSync(dbFile, JSON.stringify(db));
    return note;
}


function DeleteNote(note){
    let db = JSON.parse(fs.readFileSync(dbFile));
    db.notes = db.notes.filter(n => {n.id != note.id});
    fs.writeFileSync(dbFile, JSON.stringify(db));
}


/*

note{
    id:uuid,
    title:string
    text:string
    timestamp:number
}



*/

module.exports = {NewDB, AddNote, EditNote, DeleteNote, GetNotes};