import dataFile from "../data/notes.json";
import React, { useState, useEffect } from "react";

/**
 * Main function for the Notes.jsx
 * @returns React Component
 */
function Notes() {
  const [noteArray, setNoteArray] = useState([]);

  const isThereLocalStorage = getNotes();
  dataToLocalStorage(isThereLocalStorage);

  // Load notes from local storage on component mount
  useEffect(() => {
    const loadedNotes = storageToArray();
    setNoteArray(loadedNotes);
  }, []);

  // Function to handle note click
  const clickNote = (note) => {
    const updatedNotes = noteArray.map((n) =>
      n.id === note.id ? { ...n, isChecked: !n.isChecked } : n
    );
    setNoteArray(updatedNotes);
    setLocalStorage(note.id, note.title, !note.isChecked);
  };

  return (
    <>
      {/* Map each note in LocalStorage to its own note card */}
      {noteArray.map((note) => (
        <div className="note-card" onClick={() => clickNote(note)}>
          <h3 className={`checked-${note.isChecked}`} key={note.id}>
            {note.title}
          </h3>
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
  for (let i = 1; i <= localStorage.length; i++) {
    const note = JSON.parse(localStorage.getItem(i));
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
