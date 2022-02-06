import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ContactList from "./Components/ContactList";
import AddContact from "./Components/AddContact";
import UpdateContact from "./Components/UpdateContact";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/add-contact" element={<AddContact />} />
                        <Route
                            path="/update-contact"
                            element={<UpdateContact />}
                        />
                        <Route path="/contact-list" element={<ContactList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
