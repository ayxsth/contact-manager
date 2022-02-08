import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { authUser } from "../redux/actions/auth";
import { getError, clearError } from "../redux/actions/error";
import { setProcess } from "../redux/actions/process";

const SignInUp = ({ register }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const process = useSelector((state) => state.process);
    const { isProcessing } = process;
    const error = useSelector((state) => state.error);

    const login = async (email, password) => {
        try {
            const res = await axios.post("/signin", { email, password });
            sessionStorage.setItem("token", res.data.token);
            dispatch(authUser({ ...res.data, isAuthenticated: true }));
            navigate("/");
        } catch (e) {
            dispatch(setProcess({ isProcessing: false }));
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
            dispatch(setProcess({ isProcessing: false }));
            dispatch(getError("Invalid inputs!"));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearError());
        dispatch(setProcess({ isProcessing: true }));
        if (register) singup(email, password);
        else login(email, password);
    };

    useEffect(
        () => () => {
            dispatch(clearError());
            dispatch(setProcess({ isProcessing: false }));
        },
        []
    );

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
                        <button type="submit" disabled={isProcessing}>
                            {register
                                ? isProcessing
                                    ? "Signing Up"
                                    : "Sign Up"
                                : isProcessing
                                ? "Signing In"
                                : "Sign In"}
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
