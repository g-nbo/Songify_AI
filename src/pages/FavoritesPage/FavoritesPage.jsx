import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import SongCard from "../../components/SongCard";
import './favorites.css'
import HomeRounded from "@mui/icons-material/HomeRounded";
import { Link } from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';



function FavoritesPage() {

    const context = useContext(UserContext)





    return (
        <div id="favorites">
            <br />
            <div>
            <Link href='/' color="primary">
                <HomeRounded />
            </Link>
            <Link href='messages' color="primary">
                <QuestionAnswerIcon />
            </Link>
            
            </div>

            {
                context.user ?
                    <>
                        {/* For Each Favorite that the user has create a song card for them to see */}
                        <h1>{context.user.name}'s Favorites:</h1>
                        {
                            context.user.favorites.map((f, i) => {
                                return <SongCard key={i} songId={f} />
                            })
                        }
                    </> :
                    <h1>No Favorites Found</h1>
            }
            <br />
            <div>
            <Link href='/' color="primary">
                <HomeRounded />
            </Link>
            <Link href='messages' color="primary">
                <QuestionAnswerIcon />
            </Link>
            
            </div>
            <br />
            
        </ div>
    )
}

export default FavoritesPage