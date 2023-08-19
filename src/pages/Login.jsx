import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = ({baseURL}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login,isLoading, error} = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(email,password,baseURL)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="email">Email: </label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label htmlFor="password">Password: </label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}

            <div className="sample-cred">
                <h4>Sample Credentials:</h4>
                <p>Emails: luigi@netninja.dev , mario@netninja.dev</p>
                <p>Password: abcABC123@</p>
            </div>
        </form>
    )

}

export default Login;