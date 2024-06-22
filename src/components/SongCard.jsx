
function songCard(props) {
    
    const src = `https://open.spotify.com/embed/track/${props.songId}/?utm_source=generator`

    return (
        <>
        <p>{props.songExplanation}</p>
        <iframe style={{ "borderRadius": "12px" }} src={src} width="100%" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </>
    )
}

export default songCard