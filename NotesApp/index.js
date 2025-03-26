import './src/app-header.js';
import './src/app-footer.js';

import { sampleNotes } from "./sample-notes.js";

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set noteData(data) {
    this.shadowRoot.innerHTML = `
      <style>
        div { border: 1px solid #ddd; padding: 10px; margin: 5px; border-radius: 5px; }
      </style>
      <div>
        <h3>\${data.title}</h3>
        <p>\${data.body}</p>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <form id="noteForm">
        <input type="text" id="noteTitle" placeholder="Judul Catatan" required>
        <textarea id="noteBody" placeholder="Isi Catatan" required></textarea>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;
  }
}

customElements.define('note-form', NoteForm);

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set notes(data) {
    this.shadowRoot.innerHTML = data.map(note => `<note-item></note-item>`).join('');
    this.shadowRoot.querySelectorAll('note-item').forEach((el, index) => el.noteData = data[index]);
  }
}

customElements.define('notes-list', NotesList);

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
