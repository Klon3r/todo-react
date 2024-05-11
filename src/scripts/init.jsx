import { useRef } from "react";

/**
 * init() - Sets up the layout for todo application
 * @returns layout for todo application (React)
 */
function init() {
  const dialogRef = useRef(null);

  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      <div className="header">
        <h1 className="logo">Todo</h1>
        <div>
          <button onClick={() => toggleDialog()}>New Note</button>
        </div>
      </div>
      <dialog ref={dialogRef}>
        <h2>Todo</h2>
        <label>Todo:</label>
        <input type="text"></input>
      </dialog>
    </>
  );
}

export default init;
