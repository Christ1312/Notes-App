import { sampleNotes } from './sample-notes.js';

const notesListElement = document.querySelector('#notesList');

function createNoteItemElement({ id, title, body }) {  
  return `
    <div data-noteid="${id}">
      <h3>${title}</h3>
      <p>${body}</p>
    </div>
  `;
}

const listOfNoteItem = sampleNotes.map((sampleNote) => {
  return createNoteItemElement(sampleNote);
});

notesListElement.innerHTML = listOfNoteItem.join('');