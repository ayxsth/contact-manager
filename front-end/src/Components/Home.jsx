import Welcome from "./Welcome";
import ContactList from "./ContactList";

const Home = ({ isLogged = true }) => {
    return (
        <div className="home">
            {!isLogged && <Welcome />}
            {isLogged && <ContactList />}
        </div>
    );
};

export default Home;
