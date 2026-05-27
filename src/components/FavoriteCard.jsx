import { useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';

export default function FavoriteCard({ track, onRemove }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card
            variant="outlined"
            sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 'md',
                },
            }}
        >
            <CardOverflow sx={{ position: 'relative' }}>
                <AspectRatio ratio="1">
                    <img
                        src={track.albumArt}
                        alt={`${track.name} album art`}
                        style={{ objectFit: 'cover' }}
                    />
                </AspectRatio>
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.35)',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 1 },
                    }}
                >
                    <IconButton
                        variant="solid"
                        color="neutral"
                        size="lg"
                        sx={{ borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setExpanded(e => !e)}
                    >
                        {expanded ? <CloseRounded /> : <PlayArrowRounded />}
                    </IconButton>
                </Box>
            </CardOverflow>

            <CardContent sx={{ gap: 0.5 }}>
                <Typography level="title-sm" noWrap title={track.name}>
                    {track.name}
                </Typography>
                <Typography level="body-xs" noWrap sx={{ color: 'text.tertiary' }} title={track.artist}>
                    {track.artist}
                </Typography>
            </CardContent>

            {expanded && (
                <CardOverflow>
                    <iframe
                        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="eager"
                        style={{ display: 'block' }}
                    />
                </CardOverflow>
            )}

            <CardOverflow variant="soft" sx={{ bgcolor: 'transparent' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 0.5, px: 1 }}>
                    <IconButton
                        size="sm"
                        variant="plain"
                        color="danger"
                        onClick={() => onRemove(track.id)}
                        aria-label={`Remove ${track.name} from favorites`}
                    >
                        <DeleteOutlineRounded />
                    </IconButton>
                </Box>
            </CardOverflow>
        </Card>
    );
}
