import { useState } from "react";

function Create() {
  const [noteTitle, setNoteTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const resetValues = () => {
    console.log(noteTitle);
    setNoteTitle("");
    setErrorMessage("");
  };

  const createNote = () => {
    if (noteTitle.length > 0) {
      const id = localStorage.length + 1;
      localStorage.setItem(
        id,
        JSON.stringify({
          id: id,
          title: noteTitle,
          isChecked: false,
        })
      );
      // Reset inputs
      setNoteTitle("");
      setErrorMessage("");
    } else {
      setErrorMessage("Title must be longer");
    }
  };

  return (
    <>
      <div>
        <h2>Create Note</h2>
        <div className="create-input-div">
          <label>Title: </label>
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          ></input>
        </div>
        <div className="create-button-div">
          <button onClick={resetValues}>Reset</button>
          <button onClick={createNote}>Create</button>
        </div>
        <div>
          <p className="error-message">{errorMessage}</p>
        </div>
      </div>
    </>
  );
}

export default Create;
