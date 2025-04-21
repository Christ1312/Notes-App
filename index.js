import './style.css';
import './src/app-header.js';
import './src/app-footer.js';

import NotesApi from './remote/notesapp-api.js';

const loading = document.querySelector(".loader");
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
    this.shadowRoot.querySelector("#noteForm").addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = this.shadowRoot.getElementById("noteTitle").value;
      const body = this.shadowRoot.getElementById("noteBody").value;
      loading.style.display = "block";
      console.log(title, body);
      loading.style.display = "none";
      await NotesApi.addNotes(title, body);
      location.reload();
    });
  }
}

customElements.define('note-form', NoteForm);

const notesListElement = document.querySelector('#notesList');

function createNoteItemElement({ id, title, body, createdAt }) {  
  return `
    <div data-noteid="${id}">
      <h3>${title}</h3>
      <p>${body}</p>
      <p>${createdAt}</p>
      <button class="hapus-button">Hapus</button>
    </div>
  `;
}

const loading = document.querySelector(".loader");
loading.style.display = "block";
const data = await NotesApi.getNotes();
if(data.length==0){
  notesListElement.innerHTML = "Data Kosong";
  loading.style.display = "none";
} else{
  const listOfNoteItem = data.map((sampleNote) => {
  return createNoteItemElement(sampleNote);
  });
  notesListElement.innerHTML = listOfNoteItem.join('');
  const tombolHapus = notesListElement.querySelectorAll(".hapus-button");
for (const tombol of tombolHapus) {
  tombol.addEventListener("click", async () => {
    await NotesApi.deleteNotes(tombol.parentElement.getAttribute("data-noteid"));
    location.reload();
  });
}
loading.style.display = "none";
}
