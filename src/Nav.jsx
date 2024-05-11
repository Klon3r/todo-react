/**
 * Nav.jsx
 * Navagation bar for each page
 */

function Nav() {
  return (
    <>
      <nav>
        <div className="header">
          <h1 className="logo">Todo</h1>
          <div>
            <button onClick={() => changeHashAddress("home")}>Home</button>
            <button onClick={() => changeHashAddress("notes")}>Notes</button>
          </div>
        </div>
      </nav>
    </>
  );
}

function changeHashAddress(location) {
  window.location.hash = location;
}

export default Nav;

// <div className="header">
// <h1 className="logo">Todo</h1>
// <div>
//   <button onClick={() => toggleDialog()}>New Note</button>
// </div>
// </div>
// <dialog ref={dialogRef}>
// <h2>Todo</h2>
// <label>Todo:</label>
// <input type="text"></input>
// </dialog>
// </>
