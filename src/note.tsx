import { useState } from 'react'
// Note component, using props to individualize each note.
export default function Note({ content }: {content: string}) {
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
  