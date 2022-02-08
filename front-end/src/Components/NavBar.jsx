import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authUser } from "../redux/actions/auth";
import { clearContacts } from "../redux/actions/contacts";

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const handleClick = () => {
        sessionStorage.removeItem("token");
        dispatch(authUser({ isAuthenticated: false }));
        dispatch(clearContacts());
        navigate("/");
    };

    return (
        <nav>
            <h1>
                <Link to="/" id="logo">
                    Contact Manager
                </Link>
            </h1>

            {isAuthenticated && (
                <>
                    <Link to="/add-contact" className="nav-link add-contact">
                        Add Contact
                    </Link>
                    <button className="nav-link log-out" onClick={handleClick}>
                        Log Out
                    </button>
                </>
            )}

            {!isAuthenticated && (
                <>
                    <Link to="/login" className="nav-link sign-in">
                        Sign In
                    </Link>
                    <Link to="/register" className="nav-link sign-up">
                        Sign Up
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
