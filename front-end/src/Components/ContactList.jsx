const ContactList = () => {
    return (
        <div className="contact-wrapper">
            <h2>Contacts</h2>
            <div className="contacts">
                {[1, 2, 3, 4].map((contact) => {
                    return (
                        <div className="contact" key={contact}>
                            <img
                                src="https://i.imgur.com/tdi3NGa.png"
                                alt="profile"
                                width="100px"
                            />
                            <div className="contact-info">
                                <h3>{contact}</h3>
                                <span>9841242222</span>
                            </div>
                            <div className="actions">
                                <a className="btn" href="/update-contact">
                                    Edit
                                </a>
                                <a className="btn" href="/">
                                    Delete
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContactList;
