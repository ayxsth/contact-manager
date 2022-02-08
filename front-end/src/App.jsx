import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import UpdateContact from "./Components/UpdateContact";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authUser } from "./redux/actions/auth";
import { useEffect } from "react";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    const checkAuth = async () => {
        const res = await axios.get("/user", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        dispatch(authUser({ ...res.data, isAuthenticated: true }));
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Home /> : <SignIn />}
                        />
                        <Route
                            path="/register"
                            element={isAuthenticated ? <Home /> : <SignUp />}
                        />
                        <Route
                            path="/add-contact"
                            element={
                                isAuthenticated ? <AddContact /> : <SignIn />
                            }
                        />
                        <Route
                            path="/update-contact/:id"
                            element={
                                isAuthenticated ? <UpdateContact /> : <SignIn />
                            }
                        />
                        <Route path="/contact-list" element={<ContactList />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
