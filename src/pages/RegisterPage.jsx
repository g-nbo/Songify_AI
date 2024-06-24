import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";


function RegisterPage() {
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch("http://localhost:8000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'name': e.target[0].value,
                'email': e.target[1].value,
                'password': e.target[2].value,
                'favorites': []
            })
        })
        const data = await res.json()


        if (data.email) {
            navigate("../login")
        }
    }

    const context = useContext(UserContext)
    console.log(context)

    return (

        <>
            {
                context.user ?
                <a href="../">You're already logged in, did you mean to go Home?</a> :
                <>
                    <h1>Register</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="Name">Name</label>
                            <input type="text" id="Name" name="Name" required />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                    <a href="/login">Login</a>
                    <br />
                    <a href="/">Home</a>
                </>
            }
        </>
    )
}

export default RegisterPage