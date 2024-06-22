import { useEffect, useState } from 'react'
import './App.css'
import SongCard from './components/SongCard'


function App() {
  const [count, setCount] = useState(0)
  const [computerRes, setComputerRes] = useState("Type Something In")
  const [reccSongs, setReccSongs] = useState([])
  

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      //   const aiRes = await fetch("http://localhost:8000/messages/ai/", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       "owner": "test",
      //       "message": e.target[0].value,
      //     })
      //   })

      // setComputerRes(await aiRes.json())

      const spotifyRes = await fetch("http://localhost:8000/messages/spotify/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "songName": "",
          "artist": "Taylor Swift"
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
  console.log(reccSongs)

  return (
    
    <>
      <form onSubmit={(e) => handleSubmit(e)} action="#">
        <label htmlFor="message">Send Message: </label> <br />
        <input placeholder='message' type="text" name="message" id="message" />
        <input type="submit" />
      </form>

      <p>{
        computerRes ?
          computerRes :
          ""

      }</p>

      {
        reccSongs ?
        
        reccSongs.map((s, i) => {
          return (
            <div>
              <SongCard key={i} songId={s}/>
            </div>
          )
        }) :
        ""
      }
      
      
      
    </>
  )
}

export default App
