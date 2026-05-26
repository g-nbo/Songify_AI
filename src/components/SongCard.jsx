import { useContext } from 'react'
import { useUser } from '../context/UserContext';

function SongCard(props) {
    const { user, accessToken } = useUser();

    async function handleFavorite() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/songify/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
            body: JSON.stringify({ email: user.email, songId: props.songId }),
        });

        if (!res.ok) return;

        const updatedFavorites = await res.json();
        // favorites state is owned by the backend; FavoritesPage re-fetches on load
    }

    async function handleDeleteFav() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/songify/favorite/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
            body: JSON.stringify({ id: user._id, songId: props.songId }),
        });

        if (!res.ok) return;
    }

    const src = `https://open.spotify.com/embed/track/${props.songId}/?utm_source=generator`;

    return (
        <>
            {
                props.songId ?
                    <>
                        <span>{props.songExplanation}</span>
                        <br />
                        <br />
                        <iframe style={{ borderRadius: '13px' }} src={src} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="eager"></iframe>
                        <br />
                        <br />
                        <span>
                            <button onClick={() => handleFavorite()}>Favorite</button>
                            <button onClick={() => handleDeleteFav()}>Unfavorite</button>
                        </span>
                    </> :
                    <p>Something Went Wrong...</p>
            }
        </>
    )
}

export default SongCard
