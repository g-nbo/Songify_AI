import { useEffect, useState, useContext } from 'react'
import SongCard from '../components/SongCard'
import UserContext from "../context/UserContext";

function MusicPage() {

    const [reccSongs, setReccSongs] = useState([])
    const context = useContext(UserContext)

    // When user submits a message give it to GPT to respond with a song reccommendation
    async function handleSubmit(e) {
        e.preventDefault()

        try {

            const spotifyRes = await fetch("http://localhost:8000/songify/song", {
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
            <br />
            <a href="/">Home</a>
            <br />
            <a href="/favorites">Favorites</a>

            {
                reccSongs ?

                    reccSongs.map((s, i) => {
                        return (
                            <div>
                                <SongCard key={i} songId={s[1]} songExplanation={s[0]} />
                            </div>
                        )
                    }) :
                    ""
            }
        </>
    )
}

export default MusicPage