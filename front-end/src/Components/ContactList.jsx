import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContacts } from "../redux/actions/contacts";

const ContactList = () => {
    const contacts = useSelector((state) => state.contacts.contacts) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const res = await axios.get("/contacts", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            dispatch(setContacts(res.data));
        } catch (e) {
            navigate("/");
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            fetchContacts();
        } catch (e) {}
    };

    const updateContact = async (id, data) => {
        try {
            await axios.put(`/contacts/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            navigate("/");
        } catch (e) {}
    };

    const handleFav = (id) => {
        updateContact(id, { favorite: true });
        fetchContacts();
    };

    const handleUnfav = (id) => {
        updateContact(id, { favorite: false });
        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="contact-wrapper">
            {contacts.find((contact) => contact.favorite) && (
                <div className="contacts">
                    <h2>Favorite Contacts</h2>
                    {contacts
                        .filter((contact) => contact.favorite)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((contact) => {
                            return (
                                <div className="contact" key={contact._id}>
                                    <img
                                        src={contact.image}
                                        alt="profile"
                                        width="100px"
                                    />
                                    <div className="contact-info">
                                        <h3>{contact.name}</h3>
                                        <span>{contact.phone}</span>
                                    </div>
                                    <div className="actions">
                                        <button
                                            className="btn unfav"
                                            onClick={() => {
                                                handleUnfav(contact._id);
                                                fetchContacts();
                                            }}
                                        >
                                            Unfavorite
                                        </button>
                                        <Link
                                            className="btn"
                                            to={`/update-contact/${contact._id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                deleteContact(contact._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}

            {contacts.find((contact) => !contact.favorite) && (
                <div className="contacts">
                    <h2>Contacts</h2>
                    {contacts
                        .filter((contact) => !contact.favorite)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((contact) => {
                            return (
                                <div className="contact" key={contact._id}>
                                    <img
                                        src={contact.image}
                                        alt="profile"
                                        width="100px"
                                    />
                                    <div className="contact-info">
                                        <h3>{contact.name}</h3>
                                        <span>{contact.phone}</span>
                                    </div>
                                    <div className="actions">
                                        <button
                                            className="btn fav"
                                            onClick={() => {
                                                handleFav(contact._id);
                                                fetchContacts();
                                            }}
                                        >
                                            Favorite
                                        </button>
                                        <Link
                                            className="btn"
                                            to={`/update-contact/${contact._id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                deleteContact(contact._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default ContactList;
