let notes = [];
let activeNote = {};

const notCollectionEl = $('#note-collection');

const renderNotes = () => {
    const elements = notes.map(n => {
        return (`
        <li class="collection-item note-list" action="open" id="${n.id}">
            ${n.title}<a href="#!" class="secondary-content"
              ><i class="material-icons red-text" action="delete" id="${n.id}">delete</i></a
            >
          </li>
        `);
    });

    notCollectionEl.empty().append(elements);
};

const getNotes = () => {
  fetch("/api/notes")
    .then((r) => r.json())
    .then((q) => {
      console.log(q);
      notes = [...q];
      renderNotes();
    });
};


const renderEditor = () => {
    $('#note-title').val(activeNote.title);
    $('#note-text').val(activeNote.text);
}


const setActiveNote = (note) => {
    activeNote = {...note};
    renderEditor();
}

getNotes();

$('.collection').on('click', '.note-list',e =>{
    // console.log(e.target);
    const el = $(e.target);
    const action = el.attr("action");
    const id = el.attr("id");

    switch(action){
        case "open":
            const n = notes.filter(q => q.id === id );
            if(n.length === 1){
                let note = n[0];
                setActiveNote(note);
            }
            break;
        case "delete":
            //delete
            break;
        default:
            //
    }
    console.log(el.attr('id'), el.attr('action'));
});
