import dataFile from "../data/notes.json";
import React, { useState, useEffect, useRef } from "react";
import binImage from "../assets/bin.png";
import editImage from "../assets/edit.png";
import { json } from "react-router-dom";

/**
 * Main function for the Notes.jsx
 * @returns React Component
 */
function Notes() {
  const [noteArray, setNoteArray] = useState([]);
  const [dialogContent, setDialogContent] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [noteId, setNoteId] = useState("");
  const [errorEditMessage, setErrorEditMessage] = useState("");

  // Check if local storage is null
  const checkStorage = () => {
    const isThereLocalStorage = getNotes();
    dataToLocalStorage(isThereLocalStorage);
  };

  checkStorage();

  // Load notes from local storage on component mount
  useEffect(() => {
    const loadedNotes = storageToArray();
    setNoteArray(loadedNotes);
  }, []);

  const clickNote = (note) => {
    const updatedNotes = noteArray.map((n) =>
      n.id === note.id ? { ...n, isChecked: !n.isChecked } : n
    );
    setNoteArray(updatedNotes);
    setLocalStorage(note.id, note.title, !note.isChecked);
  };

  const deleteNote = (id) => {
    localStorage.removeItem(id);
    // Fetch notes again from local storage
    checkStorage();
    const updatedNotes = storageToArray();
    setNoteArray(updatedNotes);
  };

  const dialogRef = useRef(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  const editNote = (editNote) => {
    toggleDialog();
    setDialogContent(editNote.title);
    // Set initial value
    setNewTitle(editNote.title);
    setNoteId(editNote.id);
  };

  const editTitle = () => {
    if (newTitle.length <= 0) {
      // Display an error
      setErrorEditMessage("Title cannot be empty");
    } else {
      // Edit message
      setErrorEditMessage("");
      const note = JSON.parse(localStorage.getItem(noteId));
      console.log(note.isChecked);
      localStorage.setItem(
        note.id,
        JSON.stringify({
          id: note.id,
          title: newTitle,
          isChecked: note.isChecked,
        })
      );
      // Refresh page and close dialog
      toggleDialog();
      // Fetch notes again from local storage
      checkStorage();
      const updatedNotes = storageToArray();
      setNoteArray(updatedNotes);
    }
  };

  return (
    <>
      {/* Map each note in LocalStorage to its own note card */}
      {noteArray.map((note) => (
        <div className="note-card" key={note.id}>
          <div className="title-div" onClick={() => clickNote(note)}>
            <h3 className={`checked-${note.isChecked}`} key={note.id}>
              {note.title}
            </h3>
          </div>
          <div className="icon-div">
            <img
              className="img-icons"
              src={editImage}
              onClick={() => editNote(note)}
            ></img>
            <img
              className="img-icons"
              src={binImage}
              onClick={() => deleteNote(note.id)}
            ></img>
          </div>
          <dialog ref={dialogRef}>
            <h3>Edit</h3>
            <h4></h4>
            <label>New Title: </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            ></input>
            <button onClick={editTitle}>Save</button>
            <button onClick={toggleDialog}>Close</button>
            <p className="error-message">{errorEditMessage}</p>
          </dialog>
        </div>
      ))}
    </>
  );
}

/**
 * Grab all notes from storage and place into array
 * @returns array - An array of notes from LocalStorage
 */
function storageToArray() {
  const noteArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const note = JSON.parse(localStorage.getItem(key));
    noteArray.push(note);
  }
  return noteArray;
}

/**
 * Checks LocalStorage for notes
 * @returns boolean - false if LocalStorage is empty else returns true
 */
function getNotes() {
  // Check LocalStorage | Use JSON Data is false
  if (localStorage.length <= 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * Stores the note into LocalStorage
 * @param {int} id - The ID number for the note
 * @param {string} title - The title of the note
 * @param {boolean} isChecked - Is the task checked or not (True or False)
 */
function setLocalStorage(id, title, isChecked) {
  localStorage.setItem(
    id,
    JSON.stringify({ id: id, title: title, isChecked: isChecked })
  );
}

/**
 * Store JSON file (data/notes.json) into LocalStorage if there is nothing in LocalStorage
 * @param {boolean} isThereLocalStorage - Is the local storage empty? true or false
 */
function dataToLocalStorage(isThereLocalStorage) {
  if (isThereLocalStorage === false) {
    // Convert JSON file to LocalStorage
    dataFile.map((notes) => {
      setLocalStorage(notes.id, notes.title, notes.isChecked);
    });
  }
}
export default Notes;
