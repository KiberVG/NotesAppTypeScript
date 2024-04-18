import { useState, useEffect} from 'react';

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


// Note component, using props to individualize each note.
function Note({ content }: {content: string}) {
  const [clicked, setClicked] = useState(false)


  function handleClick() {
    setClicked(!clicked)
  }

  return (
    <div className="note" onClick={handleClick}>
      {!clicked? <h1>Click to show</h1> : <p>{content}</p>}
    </div>
  );
}

function App() {
  const [todonotes, setTodonotes] = useState([""])

  async function getNotes() {
    const response  = await fetch("http://localhost:8000/notes")
    const data: {notes: string []} = await response.json()
    setTodonotes(data['notes'])
  
  }
  
  useEffect( () => {
    getNotes()
  }
  ,[])

  async function handleSubmit(e) {
    e.preventDefault()
    const newNote: string = e.target.name.value
    await fetch("http://localhost:8000/create_note", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'content': newNote}),
    });
    getNotes()
  }

  return (
    <>
    {/* Showing the information only if the user is logged in */}
        <>
          <NavBar />
          <div className="notes">
          {/* Mapping the information from the database to separate notes */}
            {todonotes.map((element) => (
              <Note content={element} />
            ))}
          </div>
          <div>
          <form onSubmit={handleSubmit}>
            <label>Add note:</label>
            <input type="text" id="name" name="name"/>
            <button type="submit">Submit</button>
          </form>
          </div>
        </>
    </>
  );
}

export default App
