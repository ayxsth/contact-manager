import welcome from "../assets/images/welcome.svg";

const Welcome = () => {
    return (
        <div className="welcome">
            <div className="welcome-img">
                <img src={welcome} alt="welcome" width="500px" />
            </div>
            <div className="welcome-msg">
                <h1>Welcome! ;)</h1>
                <h3>Please login to check your contacts.</h3>
                <h5>Or create an account if you're new.</h5>
            </div>
        </div>
    );
};

export default Welcome;
