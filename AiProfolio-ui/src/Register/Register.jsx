import "./Register.css"
import { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

//function that Registers the user
export default function Register({ setUser, setToken }) {
    //useState for error handling and the form state
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        firstName: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    //everytime the form changes then the useState for that input is being updated with that value
    const handleOnInputChange = (event) => {
        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    //function that handles when a user submits
    const handleOnSubmit = async (event) => {
        event.preventDefault()
        setError(null)
        try {
            //make a post request to the backend register endpoint
            const res = await axios.post("http://localhost:3001/auth/register", {
                first_name: form.firstName,
                email: form.email,
                password: form.password
            })
            //if there are no errors
            if (res?.data?.user) {
                //put the user and token inside the usestate
                const user = res?.data?.user
                const token = res?.data?.token
                setUser(user)
                setToken(token)
               navigate("/saved-templates")
                //store the token in localStorage
                localStorage.setItem("token", token)
            }
        } catch (err) {
            //if there are errors (invalid password, invalid email, etc)
            if (err?.response?.data?.error) {
                const message = err?.response?.data?.error
                setError(message)
            }
        }
    }

    return (
        <>
            <div className="register">
                <h1>Welcome</h1>
                <p>Join the AiProfolio Community</p>
                <button className="GoogleButton">Continue with Google</button>
                <div className="separator">
                    <div className="line"></div>
                    <span>or</span>
                    <div className="line"></div>
                </div>
                <div className="regForm">
                    {error ? (<h2 id={error.length >= 22 ? (error.length > 43 ? "error-message-long" : "error-message") : "error-message-short"}>{error}</h2>) : (<></>)}
                    <form>
                        <label htmlFor="firstName"></label>
                        <br />
                        <input
                            type="text"
                            placeholder="First Name"
                            id="name_input"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleOnInputChange}
                        />
                        <br />
                        <label htmlFor="email"></label>
                        <br />
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleOnInputChange}
                        />
                        <br />
                        <label htmlFor="password"></label>
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleOnInputChange}
                        />
                        <br />
                        <button
                            disabled={!(form.email && form.firstName && form.password)}
                            style={{
                                "cursor": !(form.email && form.firstName && form.password) ? "default" : "pointer",
                                "backgroundColor": !(form.email && form.firstName && form.password) ? "#4d935d" : "",
                                "filter": !(form.email && form.firstName && form.password) ? "contrast(0.75)" : ""

                            }}
                            className="SignButton" onClick={handleOnSubmit}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer"> </div>
        </>
    )
}