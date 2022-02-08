import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authUser } from "../redux/actions/auth";
import { getError, clearError } from "../redux/actions/error";
import { useEffect } from "react";

const SignInUp = ({ register }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);

    const login = async (email, password) => {
        try {
            const res = await axios.post("/signin", { email, password });
            sessionStorage.setItem("token", res.data.token);
            dispatch(authUser({ ...res.data, isAuthenticated: true }));
            navigate("/");
        } catch (e) {
            dispatch(getError("Incorrect credentials!"));
        }
    };

    const singup = async (email, password) => {
        try {
            const res = await axios.post("/signup", { email, password });
            sessionStorage.setItem("token", res.data.token);
            dispatch(authUser({ ...res.data, isAuthenticated: true }));
            navigate("/");
        } catch (e) {
            dispatch(getError("Invalid inputs!"));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearError());
        if (register) singup(email, password);
        else login(email, password);
    };

    useEffect(() => () => dispatch(clearError()), []);

    return (
        <div>
            <div className="form-wrapper">
                <h2>{register ? "Sign Up Here" : "Sign In Here"}</h2>
                <form onSubmit={handleSubmit}>
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
                    {error && <p>{error}</p>}
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
