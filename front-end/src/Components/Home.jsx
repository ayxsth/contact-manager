import Welcome from "./Welcome";
import ContactList from "./ContactList";
import { useSelector } from "react-redux";

const Home = () => {
    const auth = useSelector((state) => state.auth);
    const { isAuthenticated } = auth;

    return (
        <div className="home">
            {!isAuthenticated && <Welcome />}
            {isAuthenticated && <ContactList />}
        </div>
    );
};

export default Home;
