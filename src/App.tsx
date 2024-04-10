import { useState } from 'react';

// You may have this boolean value after using some authentication
const loggedIn = true;

// You may have a list of todos from your database after your user logs in.
const todos = ["Todo 1", "Todo 2", "Todo 3"];

// You may get all of this information in this format from your database
const todonotes = [
  { title: "Todo 1", content: "Walk my dog" },
  { title: "Todo 2", content: "Walk my dog again" },
  { title: "Todo 3", content: "Remember to walk the dog again" },
  { title: "Todo 4", content: "Please don't forget to walk the dog" },
  { title: "Todo 5", content: "Oh no I think I forgot" },
  { title: "Todo 6", content: "Todo 6 content" },
  { title: "Todo 7", content: "Todo 7 content" },
  { title: "Todo 8", content: "Todo 8 content" },
];

// Navbar component
function NavBar() {
  return (
    <nav>
      <div>
        <h1 className="logo">Notes</h1>
      </div>
      <ul className="nav-links">
        <li>
          Home
        </li>
        <li>
          About
        </li>
        <li>
          Contact
        </li>
        <li>
          Login
        </li>
      </ul>
    </nav>
  );
}

interface Note {
  title: string,
  content: string,
  darkMode: boolean
}

// Note component, using props to individualize each note.
function Notes({ title, content, darkMode }: Note) {
  const [clicked, setClicked] = useState(false)

  function handleClick() {
    setClicked(!clicked)
  }

  return (
    <div className={"note " + (darkMode && "dark")} onClick={handleClick}>
      <h1>{title}</h1>
      {clicked && <p>{content}</p>}
    </div>
  );
}

function App() {

  const [dark, setDark] = useState(false)

  function handleClick() {
    setDark(!dark)
  }

  return (
    <>
    {/* Showing the information only if the user is logged in */}
      {loggedIn && (
        <>
          <NavBar />
          <div className="notes">
          {/* Mapping the information from the database to separate notes */}
            {todonotes.map((element) => (
              <Notes title={element.title} darkMode={dark} content={element.content} />
            ))}
          </div>
          <div>
            <h1>Todo List</h1>
            {/* Mapping todos to their own <li> tag. */}
            <ul>
              {todos.map((element) => (
                <li>{element}</li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={handleClick}>
              Dark Mode
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App
