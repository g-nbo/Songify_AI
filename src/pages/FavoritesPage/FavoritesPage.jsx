import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import FavoriteCard from '../../components/FavoriteCard';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Skeleton from '@mui/joy/Skeleton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import HomeRounded from '@mui/icons-material/HomeRounded';
import QuestionAnswerRounded from '@mui/icons-material/QuestionAnswerRounded';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { Link as RouterLink } from 'react-router-dom';

function SkeletonCard() {
    return (
        <Card variant="outlined">
            <CardOverflow>
                <AspectRatio ratio="1">
                    <Skeleton variant="rectangular" />
                </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ gap: 0.5 }}>
                <Skeleton variant="text" level="title-sm" />
                <Skeleton variant="text" level="body-xs" width="60%" />
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                py: 12,
                color: 'text.tertiary',
            }}
        >
            <FavoriteRounded sx={{ fontSize: 64, opacity: 0.2 }} />
            <Typography level="h4" sx={{ opacity: 0.5 }}>No favorites yet</Typography>
            <Typography level="body-sm" sx={{ opacity: 0.4 }}>
                Head to the chat and save some songs you love.
            </Typography>
            <Link component={RouterLink} to="/messages" level="title-sm">Go to chat →</Link>
        </Box>
    );
}

export default function FavoritesPage() {
    const { user, accessToken, updateFavorites } = useUser();
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.favorites?.length) {
            setLoading(false);
            return;
        }

        async function fetchTracks() {
            const results = await Promise.all(
                user.favorites.map(id =>
                    fetch(`${import.meta.env.VITE_API_URL}/songify/track/${id}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` },
                        credentials: 'include',
                    }).then(r => r.ok ? r.json() : null)
                )
            );
            setTracks(results.filter(Boolean));
            setLoading(false);
        }

        fetchTracks();
    }, [user?.favorites, accessToken]);

    async function handleRemove(trackId) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/songify/favorite/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
            body: JSON.stringify({ songId: trackId }),
        });

        if (res.ok) {
            const updatedFavorites = await res.json();
            updateFavorites(updatedFavorites);
            setTracks(prev => prev.filter(t => t.id !== trackId));
        }
    }

    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ minHeight: '100dvh', bgcolor: 'background.body', px: { xs: 2, sm: 4, md: 8 }, py: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FavoriteRounded sx={{ color: 'danger.400' }} />
                        <Typography level="h3">
                            {user?.name}'s Favorites
                        </Typography>
                        {!loading && tracks.length > 0 && (
                            <Typography level="body-sm" sx={{ color: 'text.tertiary', ml: 1 }}>
                                {tracks.length} {tracks.length === 1 ? 'song' : 'songs'}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton component={RouterLink} to="/" variant="soft" size="sm" aria-label="Home">
                            <HomeRounded />
                        </IconButton>
                        <IconButton component={RouterLink} to="/messages" variant="soft" size="sm" aria-label="Chat">
                            <QuestionAnswerRounded />
                        </IconButton>
                    </Box>
                </Box>

                {loading ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: 2,
                        }}
                    >
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </Box>
                ) : tracks.length === 0 ? (
                    <EmptyState />
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                            gap: 2,
                        }}
                    >
                        {tracks.map(track => (
                            <FavoriteCard key={track.id} track={track} onRemove={handleRemove} />
                        ))}
                    </Box>
                )}
            </Box>
        </CssVarsProvider>
    );
}
