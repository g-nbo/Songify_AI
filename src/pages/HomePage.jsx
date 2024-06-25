function logout() {
    localStorage.getItem("userId") ?
    localStorage.removeItem("userId") :
    console.log("cant logout if you're not logged in")
}


function HomePage() {
    return (
        <div>
            <p>Home</p>
            <a href="login">Login</a>
            <br />
            <a href="register">Register</a>
            <br />
            <a href="favorites">Favorites</a>
            <br />
            <a href="messages">Messages</a>
            <br />
            <a href="Home">Home</a>
            <br />
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default HomePage