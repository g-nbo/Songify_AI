import { useEffect, useState } from 'react'
import './App.css'
import SongCard from './components/SongCard'


function App() {
  const [count, setCount] = useState(0)
  const [reccSongs, setReccSongs] = useState([])
  

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      // setComputerRes(await aiRes.json())

      const spotifyRes = await fetch("http://localhost:8000/messages/spotify/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "message": e.target[0].value,
        })
      })
      const spotifyData = await spotifyRes.json();
      
      const newSong = spotifyData

      setReccSongs([
        ...reccSongs,
        newSong
      ])
      




      e.target[0].value = ""
    } catch (err) {
      console.log(err)
    }

  }


  return (
    
    <>
      <form onSubmit={(e) => handleSubmit(e)} action="#">
        <label htmlFor="message">Send Message: </label> <br />
        <input placeholder='message' type="text" name="message" id="message" />
        <input type="submit" />
      </form>

      {
        reccSongs ?
        
        reccSongs.map((s, i) => {
          return (
            <div>
              <SongCard key={i} songId={s[1]} songExplanation={s[0]}/>
            </div>
          )
        }) :
        ""
      }
      
      
      
    </>
  )
}

export default App
