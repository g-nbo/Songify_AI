import { useContext, useEffect, useState } from 'react'
import UserContext from "../context/UserContext";


function SongCard(props) {
    const context = useContext(UserContext)


    // When user clicks favorite
    async function handleFavorite() {


        const res = await fetch('https://songify-ai-backend.onrender.com/songify/favorite', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': context.user.email,
                'songId': props.songId
            })
        })

        const data = await res.json()


        // Reflect db changes in local storage for users view
        const user = JSON.parse(localStorage.getItem("userId"))

        user.favorites.push(props.songId)

        localStorage.setItem("userId", JSON.stringify(user))
    }

    // When user clicks unfavorite
    async function handleDeleteFav() {


        const res = await fetch('https://songify-ai-backend.onrender.com/songify/favorite/delete', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': context.user._id,
                'songId': props.songId
            })
        })

        const data = await res.json()


        // Reflect db changes in local storage for users view
        const user = JSON.parse(localStorage.getItem("userId"))

        const favoriteIndex = user.favorites.indexOf(props.songId)

        user.favorites.splice(props.songId, 1)

        localStorage.setItem("userId", JSON.stringify(user))
    }




    const src = `https://open.spotify.com/embed/track/${props.songId}/?utm_source=generator`

    return (
        <>
            {
                props.songId ?
                    <>
                        <span>{props.songExplanation}</span>
                        <iframe style={{ "borderRadius": "13px" }} src={src} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        <span>
                            <button onClick={() => handleFavorite(props.songId)}>Favorite</button>
                            <button onClick={() => handleDeleteFav(props.songId)}>Unfavorite</button>
                        </span>

                    </> :
                    <p>Something Went Wrong...</p>
            }

        </>
    )
}

export default SongCard