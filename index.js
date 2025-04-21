import './style.css';
import './src/app-header.js';
import './src/app-footer.js';

import NotesApi from './remote/notesapp-api.js';

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
    this.shadowRoot.querySelector("#noteForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const title = this.shadowRoot.getElementById("noteTitle").value;
      const body = this.shadowRoot.getElementById("noteBody").value;
      console.log(title, body);
      NotesApi.addNotes(title, body);
    });
  }
}

customElements.define('note-form', NoteForm);

const notesListElement = document.querySelector('#notesList');

function createNoteItemElement({ id, title, body, createdAt }) {  
  const template = 
    <div data-noteid="${id}">
      <h3>${title}</h3>
      <p>${body}</p>
      <p>${createdAt}</p>
      <button class="hapus-button">Hapus</button>
    </div>
  template.querySelector(".hapus-button").addEventListener("click", () => {
    console.log(id);
  });
   
  return template;
}

const data = await NotesApi.getNotes();
if(data.length==0){
  notesListElement.innerHTML = "Data Kosong";
} else{
  const listOfNoteItem = data.map((sampleNote) => {
  return createNoteItemElement(sampleNote);
  });
  notesListElement.innerHTML = listOfNoteItem.join('');
}
