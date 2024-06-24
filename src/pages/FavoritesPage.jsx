import UserContext from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import SongCard from "../components/SongCard";



function FavoritesPage() {

    const context = useContext(UserContext)
    const [favorites, setFavorites] = useState(context.user.favorites)
    

    

    return (
        <>
            <p>{context.user.name}</p>
            {
                context.user.favorites.length ?
                    <>
                        <p>Favorites: </p>
                        {
                    context.user.favorites.map((f, i) => {
                        return <SongCard key={i} songId={f} />
                    })
                }
                    </> :
                    "No Favorites Found"
            }
            <br />
            <a href="/">Home</a>
            <br />
            <a href="/music">Music</a>
        </>
    )
}

export default FavoritesPage