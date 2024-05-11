/**
 * Notes.jsx
 * Display and retrieve notes from
 */

import dataFile from "../data/notes.json";
import React from "react";

function Note() {
  return (
    <>
      {/* Map each note in the json file to its own note card */}
      {dataFile.map((note) => (
        <div className="note-card">
          <h3 id={`checked-${note.isChecked}`} key={note.id}>
            {note.title}
          </h3>
        </div>
      ))}
    </>
  );
}

function getNotes() {
  console.log(dataFile);
}

export default Note;
