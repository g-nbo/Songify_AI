import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import SongCard from "../../components/SongCard";
import './favorites.css'



function FavoritesPage() {

    const context = useContext(UserContext)
    
    

    

    return (
        <>
            
            {
                context.user ?
                    <>
                        <p>{context.user.name}</p>
                        <p>Favorites: </p>
                        {
                    context.user.favorites.map((f, i) => {
                        return <SongCard key={i} songId={f} />
                    })
                }
                    </> :
                    <h1>No Favorites Found</h1>
            }
            <br />
            <a href="/home">Home</a>
            <br />
            <a href="/messages">Music</a>
        </>
    )
}

export default FavoritesPage