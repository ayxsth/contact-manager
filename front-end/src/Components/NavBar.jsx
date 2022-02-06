import { Link } from "react-router-dom";

const NavBar = ({ isLogged = true }) => {
    return (
        <nav>
            <h1>
                <Link to="/" id="logo">
                    Contact Manager
                </Link>
            </h1>

            {isLogged && (
                <>
                    <Link to="/add-contact" className="nav-link add-contact">
                        Add Contact
                    </Link>
                    <Link to="/register" className="nav-link log-out">
                        Log Out
                    </Link>
                </>
            )}

            {!isLogged && (
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
