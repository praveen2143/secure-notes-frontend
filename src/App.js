import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'; // Import the CSS

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const loadNotes = async () => {
    const res = await axios.get("https://secure-notes-backend-production.up.railway.app/api/notes");
    setNotes(res.data);
  };

  const saveNote = async () => {
    const res = await axios.post("https://secure-notes-backend-production.up.railway.app/api/notes", newNote);
    setNotes([...notes, res.data]);
    setNewNote({ title: "", content: "" });
  };

  const deleteNote = async (id) => {
    await axios.delete(`https://secure-notes-backend-production.up.railway.app/api/notes/${id}`);
    setNotes(notes.filter(note => note.id !== id));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="container">
      <h1>Secure Notes</h1>
      <input 
        placeholder="Title" 
        value={newNote.title} 
        onChange={e => setNewNote({ ...newNote, title: e.target.value })} 
      />
      <textarea 
        placeholder="Content" 
        value={newNote.content} 
        onChange={e => setNewNote({ ...newNote, content: e.target.value })} 
      />
      <button onClick={saveNote}>Add Note</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <b>{note.title}</b>
            <p>{note.content}</p>
            <button 
              className="delete" 
              onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
