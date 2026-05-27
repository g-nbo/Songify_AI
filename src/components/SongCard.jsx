import { useState } from 'react';
import Button from '@mui/joy/Button';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useUser } from '../context/UserContext';

function SongCard(props) {
    const { user, accessToken, updateFavorites } = useUser();
    const [error, setError] = useState('');

    async function handleFavorite() {
        setError('');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/songify/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify({ songId: props.songId }),
            });

            if (!res.ok) {
                setError('Could not save favorite.');
                return;
            }

            const updatedFavorites = await res.json();
            updateFavorites(updatedFavorites);
        } catch {
            setError('Could not save favorite.');
        }
    }

    async function handleDeleteFav() {
        setError('');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/songify/favorite/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify({ songId: props.songId }),
            });

            if (!res.ok) {
                setError('Could not remove favorite.');
                return;
            }

            const updatedFavorites = await res.json();
            updateFavorites(updatedFavorites);
        } catch {
            setError('Could not remove favorite.');
        }
    }

    const [actionLoading, setActionLoading] = useState(false);
    const isFavorited = user?.favorites?.includes(props.songId);
    const src = `https://open.spotify.com/embed/track/${props.songId}/?utm_source=generator`;

    async function handleToggleFavorite() {
        setActionLoading(true);
        if (isFavorited) {
            await handleDeleteFav();
        } else {
            await handleFavorite();
        }
        setActionLoading(false);
    }

    return (
        <>
            {props.songId ? (
                <>
                    <span>{props.songExplanation}</span>
                    <br /><br />
                    <iframe
                        style={{ borderRadius: '13px' }}
                        src={src}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="eager"
                    />
                    <br /><br />
                    {error && <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>}
                    <Button
                        size="sm"
                        variant={isFavorited ? 'soft' : 'outlined'}
                        color={isFavorited ? 'danger' : 'neutral'}
                        loading={actionLoading}
                        startDecorator={isFavorited ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
                        onClick={handleToggleFavorite}
                    >
                        {isFavorited ? 'Unfavorite' : 'Favorite'}
                    </Button>
                </>
            ) : (
                <p>Something Went Wrong...</p>
            )}
        </>
    );
}

export default SongCard;
