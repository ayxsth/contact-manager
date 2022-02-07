import { useState } from "react";
import { Link } from "react-router-dom";

const SignInUp = ({ register }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className="form-wrapper">
                <h2>{register ? "Sign Up Here" : "Sign In Here"}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!register && <p>Incorrect credentials!</p>}
                    <div className="form-action">
                        <button type="submit">
                            {register ? "Sign Up" : "Sign In"}
                        </button>
                        {register && (
                            <Link to={"/login"}>Already have an account?</Link>
                        )}
                        {!register && (
                            <Link to={"/register"}>Create an account</Link>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInUp;
