import { useUser } from "../../context/UserContext";
import SongCard from "../../components/SongCard";
import './favorites.css';
import HomeRounded from "@mui/icons-material/HomeRounded";
import { Link } from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function FavoritesPage() {
    const { user } = useUser();

    return (
        <div id="favorites">
            <br />
            <div>
                <Link href='/' color="primary"><HomeRounded /></Link>
                <Link href='messages' color="primary"><QuestionAnswerIcon /></Link>
            </div>
            <h1>{user.name}'s Favorites:</h1>
            {user.favorites.length > 0
                ? user.favorites.map((f, i) => <SongCard key={i} songId={f} />)
                : <p>No favorites yet — go find some songs!</p>
            }
            <br />
            <div>
                <Link href='/' color="primary"><HomeRounded /></Link>
                <Link href='messages' color="primary"><QuestionAnswerIcon /></Link>
            </div>
            <br />
        </div>
    );
}

export default FavoritesPage;
