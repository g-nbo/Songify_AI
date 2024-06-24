import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";



function LoginPage() {

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
    
        const res = await fetch("http://localhost:8000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'email': e.target[0].value,
                'password': e.target[1].value,
            })
        })
        
        const data = await res.json()
    
        if(data) {
            localStorage.setItem('userId', JSON.stringify(data))
            navigate('../music')
        }
        
        
    }

        const context = useContext(UserContext)
        
    

    return (
        <>
            
            {
                context.user ?
                <a href="../">You're already logged in, did you mean to go Home?</a> :
                <>
                <h1>Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            <a href="/register">Register</a>
            <br />
            <a href="/">Home</a>
            </>
            }
            
        </>
    )
}

export default LoginPage