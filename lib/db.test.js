const db = require('./db');

const testNote1 = {
    title: "new note",
    text: "note text",
}

const testNote2 = {
    title: "new note 2",
    text: "note text 2",
}

describe('Json db', () => {
    it('should create new database', ()=>{
        db.NewDB();
        db.AddNote(testNote1);
        db.AddNote(testNote2);

        const notes = db.GetNotes();
        
        expect(notes.length).toEqual(2);
        expect(notes[0]).toEqual(testNote1);
        expect(notes[1]).toEqual(testNote2);

        // cleanup
        db.NewDB();

    } );

});