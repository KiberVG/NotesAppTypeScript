import { useState, useEffect} from 'react';
import NavBar from './NavBar'
import Note from './note'

function App() {
  const [todonotes, setTodonotes] = useState<string []>([])

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
