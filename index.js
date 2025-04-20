import './style.css';
import './src/app-header.js';
import './src/app-footer.js';

import { sampleNotes } from "./sample-notes.js";

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
