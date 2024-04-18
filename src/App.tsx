import { useState, useEffect} from 'react';
import NavBar from './NavBar'
import Note from './note'

function App() {
  const [todonotes, setTodonotes] = useState<string []>([])

  // This gets the notes and changes the state
  // The backend currently returns a just a list of strings
  async function getNotes() {
    const response  = await fetch("http://localhost:8000/notes")
    const data: {notes: string []} = await response.json()
    setTodonotes(data['notes'])
  }
  
  // This will run during the initial render, just to display the notes at the start
  useEffect( () => {
    getNotes()
  }
  ,[])

  // This handles when a user decides to add a new note.
  async function handleSubmit(e) {
    // Preventing page reload
    e.preventDefault()
    // Getting the user input from the form
    const newNote: string = e.target.name.value
    await fetch("http://localhost:8000/create_note", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'content': newNote}),
    });
    // Getting all of the notes from the server again after adding new one
    getNotes()
  }

  return (
    <>
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
